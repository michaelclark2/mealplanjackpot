import { v } from 'convex/values'
import { query, mutation } from './_generated/server'

export const getMealPlan = query({
  args: {
    mealPlanId: v.id('mealPlans'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.mealPlanId)
  },
})
export const getMealPlans = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) return
    const mealPlans = await ctx.db
      .query('mealPlans')
      .withIndex('by_identifier', (q) => q.eq('identifier', identity.email!))
      .order('desc')
      .collect()
    return mealPlans
  },
})

export const saveMealPlan = mutation({
  args: { recipes: v.array(v.any()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const newMealPlanID = await ctx.db.insert('mealPlans', {
      identifier: identity?.email!,
      recipes: args.recipes,
      startDate: nextDate(0),
    })
    return newMealPlanID
  },
})

export const deleteMealPlan = mutation({
  args: { id: v.id('mealPlans') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return
    return await ctx.db.delete(args.id)
  },
})

const nextDate = (dayOfWeek: number) => {
  const today = new Date()
  today.setDate(today.getDate() + ((dayOfWeek + (7 - today.getDay())) % 7))
  return today.getTime()
}
