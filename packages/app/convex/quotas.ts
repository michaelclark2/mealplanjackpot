import { v } from 'convex/values'
import { internalMutation, internalQuery } from './_generated/server'

export const getUserQuota = internalQuery({
  args: {
    identifier: v.string(),
  },
  handler: async (ctx, args) => {
    const quota = await ctx.db
      .query('quotas')
      .withIndex('by_identifier', (q) => q.eq('identifier', args.identifier))
      .unique()
    return quota
  },
})

export const getQuota = internalQuery({
  args: { quotaID: v.id('quotas') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.quotaID)
  },
})

export const updateQuota = internalMutation({
  args: { quotaID: v.id('quotas'), queryLimit: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.quotaID, { queryLimit: args.queryLimit })
  },
})

export const resetUserQuota = internalMutation({
  args: {
    quotaID: v.optional(v.id('quotas')),
    identifier: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const queryLimit: number =
      (identity
        ? (process.env.QUOTA_LIMIT_AUTHED as unknown as number)
        : (process.env.QUOTA_LIMIT_FREE as unknown as number)) * 1

    if (!args.quotaID) {
      console.log('new quota')
      return await ctx.db.insert('quotas', {
        identifier: args.identifier,
        last_reset_date: new Date().getTime(),
        queryLimit,
      })
    } else {
      console.log('updated quota')
      await ctx.db.patch(args.quotaID, {
        identifier: args.identifier,
        last_reset_date: new Date().getTime(),
        queryLimit,
      })
      return args.quotaID
    }
  },
})
