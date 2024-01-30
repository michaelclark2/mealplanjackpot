import { httpAction } from './_generated/server'
import { internal } from './_generated/api'

export const getRandom = httpAction(async (ctx, request) => {
  const identity = await ctx.auth.getUserIdentity()
  let results = []
  const number = new URL(request.url).searchParams.get('number')
  if (identity) {
    const identifier = identity.email
    if (Number(number) > 0) {
      let quota = await ctx.runQuery(internal.quotas.getUserQuota, {
        identifier,
      })

      console.log(new Date().getTime() - quota.last_reset_date)

      if (
        quota === null ||
        new Date().getTime() - quota.last_reset_date > 1000 * 60 * 60 * 24
      ) {
        console.log('resetting quota')
        const quotaID = await ctx.runMutation(internal.quotas.resetUserQuota, {
          quotaID: quota?._id,
          identifier,
        })
        quota = await ctx.runQuery(internal.quotas.getQuota, { quotaID })
      }

      if (quota.queryLimit > 0) {
        console.log('able to query', quota.queryLimit)
        const recipes = await ctx.runAction(
          internal.spoonacular.complexSearch,
          {
            number,
          },
        )
        results = recipes['results']
        await ctx.runMutation(internal.quotas.updateQuota, {
          quotaID: quota._id,
          queryLimit: quota.queryLimit - 1,
        })
      } else {
        console.log('quota limit reached')
      }
    }
  } else {
    if (Number(number) > 0 && Number(number) <= 4) {
      const identifier = request.headers.get('x-forwarded-for') // ip address
      let quota = await ctx.runQuery(internal.quotas.getUserQuota, {
        identifier,
      })
      if (
        quota === null ||
        new Date().getTime() - quota.last_reset_date > 1000 * 60 * 60 * 24
      ) {
        const quotaID = await ctx.runMutation(internal.quotas.resetUserQuota, {
          identifier,
        })
        quota = await ctx.runQuery(internal.quotas.getQuota, { quotaID })
      }
      if (quota.queryLimit > 0) {
        const recipes = await ctx.runAction(
          internal.spoonacular.complexSearch,
          {
            number,
          },
        )
        results = recipes['results']
        await ctx.runMutation(internal.quotas.updateQuota, {
          quotaID: quota._id,
          queryLimit: quota.queryLimit - 1,
        })
      } else {
        console.log('quota reached')
      }
    }
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN,
      Vary: 'origin',
    }),
  })
})
