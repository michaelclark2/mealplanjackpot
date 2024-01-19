import { httpAction } from './_generated/server'
import { internal } from './_generated/api'

export const getRandom = httpAction(async (ctx, request) => {
  const recipes = await ctx.runAction(internal.spoonacular.complexSearch)
  return new Response(JSON.stringify(recipes['results']), {
    status: 200,
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN,
      Vary: 'origin',
    }),
  })
})
