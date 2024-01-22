import { internalAction } from './_generated/server'

export const complexSearch = internalAction({
  args: {},
  handler: async () => {
    const baseURL = new URL('https://api.spoonacular.com/recipes/complexSearch')
    const defaultParams = {
      apiKey: process.env.SPOONACULAR_APIKEY,
      addRecipeInformation: 'true',
      sort: 'random',
      type: 'main course',
      number: '5',
    }
    const params = new URLSearchParams(defaultParams)
    const recipes = await fetch(baseURL + '?' + params)
    return await recipes.json()
  },
})
