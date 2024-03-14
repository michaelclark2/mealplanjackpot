import { v } from 'convex/values'
import { action, query } from './_generated/server'
import { api } from './_generated/api'

const PANTRY_INGREDIENT_NAMES = [
  'black pepper',
  'salt and pepper',
  'table salt',
]

export const getShoppingList = query({
  args: {
    mealPlanId: v.id('mealPlans'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) return

    return await ctx.db
      .query('shoppingLists')
      .withIndex('by_identifier_and_mealPlanId', (q) =>
        q.eq('identifier', identity.email!).eq('mealPlanId', args.mealPlanId),
      )
      .first()
  },
})

export const createShoppingListByMealPlanId = action({
  args: { mealPlanId: v.id('mealPlans') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    // if (identity === null) return
    const mealPlan = await ctx.runQuery(api.mealPlans.getMealPlan, {
      mealPlanId: args.mealPlanId,
    })

    const allIngredients = mealPlan!.recipes
      .map((recipe) =>
        recipe.extendedIngredients.map((ingredient) => ({
          ...ingredient,
          recipeId: recipe.id,
        })),
      )
      .flat()

    const groupedIngredientsByName = allIngredients.reduce(
      (prev, ingredient) => {
        if (ingredient.nameClean === undefined)
          console.log(ingredient.name, 'NAMECLEAN is undefined')
        if (PANTRY_INGREDIENT_NAMES.includes(ingredient.nameClean)) return prev
        const groupedIngredientsByName = { ...prev }
        if (
          !Object.keys(groupedIngredientsByName).includes(ingredient.nameClean)
        ) {
          groupedIngredientsByName[ingredient.nameClean] = []
        }
        groupedIngredientsByName[ingredient.nameClean].push({
          recipeId: ingredient.recipeId,
          measures: { ...ingredient.measures.us },
        })
        return groupedIngredientsByName
      },
      {} as Record<string, Array<any>>,
    )

    console.log(groupedIngredientsByName)
  },
})
