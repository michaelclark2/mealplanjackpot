import { ConvexError, v } from 'convex/values'
import { internalAction } from './_generated/server'

export const complexSearch = internalAction({
  args: {
    number: v.string(),
  },
  handler: async (ctx, args) => {
    if (Number(args.number) < 0 || Number(args.number) > 7)
      throw new ConvexError('Query parameters are incorrect')
    const baseURL = new URL('https://api.spoonacular.com/recipes/complexSearch')
    const defaultParams = {
      apiKey: process.env.SPOONACULAR_APIKEY,
      addRecipeInformation: 'true',
      sort: 'random',
      type: 'main course',
      number: args.number,
    }
    const params = new URLSearchParams(defaultParams)
    const recipes = await fetch(baseURL + '?' + params)
    return await recipes.json()
  },
})
