import { ConvexError, v } from 'convex/values'
import { internalAction } from './_generated/server'

export const complexSearch = internalAction({
  args: {
    number: v.string(),
    diet: v.optional(v.array(v.string())),
    intolerances: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    if (Number(args.number) < 0 || Number(args.number) > 7)
      throw new ConvexError('Query parameters are incorrect')
    const baseURL = new URL('https://api.spoonacular.com/recipes/complexSearch')
    const defaultParams = {
      apiKey: process.env.SPOONACULAR_APIKEY!,
      addRecipeInformation: 'true',
      fillIngredients: 'true',
      instructionsRequired: 'true',
      sort: 'random',
      type: 'main course',
      number: args.number,
      diet: args.diet?.join(','),
      intolerances: args.intolerances?.join(','),
    }
    const params = new URLSearchParams(defaultParams as Record<string, string>)
    const recipes = await fetch(baseURL + '?' + params)
    if (!recipes.ok) {
      console.log(recipes.statusText)
    }
    return await recipes.json()
  },
})
