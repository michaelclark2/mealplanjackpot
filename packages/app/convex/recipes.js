import { httpAction } from './_generated/server'
import { internal, api } from './_generated/api'

export const getRandom = httpAction(async (ctx, request) => {
  const identity = await ctx.auth.getUserIdentity()
  const identifier = identity
    ? identity.email
    : request.headers.get('x-forwarded-for') // ip address

  let results = []
  const number = new URL(request.url).searchParams.get('number')
  if (Number(number) > 0) {
    const quota = await getUserQuota(identifier, ctx)
    if (quota.queryLimit > 0) {
      const userSettings = await ctx.runQuery(api.settings.getUserSettings)
      if (identity && userSettings.default) {
        await ctx.runMutation(internal.settings.createUserSettings)
      }
      const recipes = await ctx.runAction(internal.spoonacular.complexSearch, {
        number,
        diet: userSettings.diet,
        intolerances: userSettings.intolerances,
      })
      results = recipes['results']
      await ctx.runMutation(internal.quotas.updateQuota, {
        quotaID: quota._id,
        queryLimit: quota.queryLimit - 1,
      })
    } else {
      return new Response(null, {
        status: 429,
        statusText: 'Query limit reached',
        headers: new Headers({
          'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN,
          Vary: 'origin',
        }),
      })
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

const getUserQuota = async (identifier, ctx) => {
  let quota = await ctx.runQuery(internal.quotas.getUserQuota, {
    identifier,
  })

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
  return quota
}
