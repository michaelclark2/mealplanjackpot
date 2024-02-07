import { query } from './_generated/server'

export const getUserSettings = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return

    return {
      diets: [],
      intolerances: [],
    }
  },
})
