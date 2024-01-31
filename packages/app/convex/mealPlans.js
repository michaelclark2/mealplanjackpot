import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const saveMealPlan = mutation({
  args: { recipes: v.array(v.any()) },
  handler: async (ctx, args) => {
    const recipes = args.recipes.map((recipe) => {
      delete recipe.locked
      return recipe
    })
    const identity = await ctx.auth.getUserIdentity()
    const newMealPlanID = await ctx.db.insert('mealPlans', {
      identifier: identity.email,
      recipes: recipes,
    })
    return newMealPlanID
  },
})
