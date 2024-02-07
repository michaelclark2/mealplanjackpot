import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const getMealPlans = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) return
    const mealPlans = await ctx.db
      .query('mealPlans')
      .filter((q) => q.eq(q.field('identifier'), identity.email))
      .order('desc')
      .collect()
    return mealPlans
  },
})

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
      startDate: nextDate(0),
    })
    return newMealPlanID
  },
})

const nextDate = (dayOfWeek) => {
  const today = new Date()
  today.setDate(today.getDate() + ((dayOfWeek + (7 - today.getDay())) % 7))
  return today.getTime()
}
