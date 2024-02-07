import { v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'

const DEFAULT_USERSETTINGS = {
  numberOfRecipes: 4,
  diet: [],
  intolerances: [],
  default: true,
}

export const getUserSettings = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return DEFAULT_USERSETTINGS

    const userSettings = await ctx.db
      .query('userSettings', (q) => q.eq(q.field('identifier'), identity.email))
      .unique()

    return userSettings ?? DEFAULT_USERSETTINGS
  },
})

export const createUserSettings = internalMutation({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return
    return await ctx.db.insert('userSettings', {
      identifier: identity.email,
      numberOfRecipes: 4,
      diet: [],
      intolerances: [],
    })
  },
})

export const editUserSettings = mutation({
  args: {
    id: v.id('userSettings'),
    numberOfRecipes: v.number((v) => v >= 1 && v <= 7),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args.settings)
  },
})