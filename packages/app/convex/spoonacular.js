import { internalAction } from './_generated/server'

export const complexSearch = internalAction({
  args: {},
  handler: async () => {
    const recipes = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_APIKEY}`,
    )
    return await recipes.json()
  },
})
