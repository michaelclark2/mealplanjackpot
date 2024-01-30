import { v } from 'convex/values'
import { internalMutation, internalQuery } from './_generated/server'

export const getUserQuota = internalQuery({
  args: {
    identifier: v.string(),
  },
  handler: async (ctx, args) => {
    const quota = await ctx.db
      .query('quotas')
      .filter((q) => q.eq(q.field('identifier'), args.identifier))
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
    if (!args.quotaID) {
      console.log('new quota')
      return await ctx.db.insert('quotas', {
        identifier: args.identifier,
        last_reset_date: new Date().getTime(),
        queryLimit: identity
          ? process.env.QUOTA_LIMIT_AUTHED * 1
          : process.env.QUOTA_LIMIT_FREE * 1,
      })
    } else {
      console.log('updated quota')
      await ctx.db.patch(args.quotaID, {
        identifier: args.identifier,
        last_reset_date: new Date().getTime(),
        queryLimit: identity
          ? process.env.QUOTA_LIMIT_AUTHED * 1
          : process.env.QUOTA_LIMIT_FREE * 1,
      })
      return args.quotaID
    }
  },
})
