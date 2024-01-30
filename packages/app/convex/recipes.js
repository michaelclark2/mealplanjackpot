import { httpAction } from './_generated/server'
import { internal } from './_generated/api'

export const getRandom = httpAction(async (ctx, request) => {
  const identity = await ctx.auth.getUserIdentity()
  console.log(identity)
  console.log(request.headers)
  let results = []
  const number = new URL(request.url).searchParams.get('number')
  if (Number(number) > 0) {
    const recipes = await ctx.runAction(internal.spoonacular.complexSearch, {
      number,
    })
    results = recipes['results']
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN,
      Vary: 'origin',
    }),
  })
})
