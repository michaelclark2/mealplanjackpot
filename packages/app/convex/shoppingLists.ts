import { v } from 'convex/values'
import { action, internalMutation, mutation, query } from './_generated/server'
import { api, internal } from './_generated/api'
import { SpoonacularRecipe } from 'app/components/RecipeCard'
import { Doc } from './_generated/dataModel'

const PANTRY_INGREDIENT_NAMES = [
  'black pepper',
  'salt and pepper',
  'table salt',
  'water',
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

export const createShoppingList = internalMutation({
  args: { ingredientsList: v.any(), mealPlanId: v.id('mealPlans') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) return
    return await ctx.db.insert('shoppingLists', {
      identifier: identity.email as string,
      mealPlanId: args.mealPlanId,
      list: args.ingredientsList,
      completedItems: [],
    })
  },
})

export const updateShoppingList = mutation({
  args: {
    shoppingListId: v.id('shoppingLists'),
    list: v.optional(v.any()),
    completedItems: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.shoppingListId, {
      completedItems: args.completedItems,
    })
  },
})

// @ts-ignore
export const createShoppingListByMealPlanId = action({
  args: { mealPlanId: v.id('mealPlans') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) return
    const mealPlan: Doc<'mealPlans'> = await ctx.runQuery(
      api.mealPlans.getMealPlan,
      {
        mealPlanId: args.mealPlanId,
      },
    )

    const allIngredients = mealPlan!.recipes
      .map((recipe: SpoonacularRecipe) =>
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
          ...ingredient.measures.us,
        })
        return groupedIngredientsByName
      },
      {} as Record<string, Array<any>>,
    )
    const shoppingListItems = Object.keys(groupedIngredientsByName).map(
      (ingredientName) => ({
        name: ingredientName,
        measures: groupedIngredientsByName[ingredientName],
      }),
    )
    return await ctx.runMutation(internal.shoppingLists.createShoppingList, {
      mealPlanId: mealPlan!._id,
      ingredientsList: shoppingListItems,
    })
  },
})
