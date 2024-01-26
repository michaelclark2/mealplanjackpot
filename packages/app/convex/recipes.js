import { httpAction } from './_generated/server'
import { internal } from './_generated/api'

export const getRandom = httpAction(async (ctx, request) => {
  const number = new URL(request.url).searchParams.get('number')
  const recipes = await ctx.runAction(internal.spoonacular.complexSearch, {
    number,
  })
  return new Response(JSON.stringify(recipes['results']), {
    status: 200,
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN,
      Vary: 'origin',
    }),
  })
})
