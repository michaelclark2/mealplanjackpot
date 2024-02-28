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
      .query('userSettings')
      .withIndex('by_identifier', (q) => q.eq('identifier', identity.email!))
      .unique()

    return userSettings ?? DEFAULT_USERSETTINGS
  },
})

export const createUserSettings = internalMutation({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return
    return await ctx.db.insert('userSettings', {
      identifier: identity.email!,
      numberOfRecipes: 4,
      diet: [],
      intolerances: [],
      isSubscribed: false,
    })
  },
})

export const editUserSettings = mutation({
  args: {
    id: v.id('userSettings'),
    numberOfRecipes: v.optional(v.number()),
    diet: v.optional(v.array(v.string())),
    intolerances: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...newSettings } = args
    return await ctx.db.patch(id, newSettings)
  },
})
