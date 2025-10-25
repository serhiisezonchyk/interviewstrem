import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getAllInterviews = query({
  args: {
    interviewId: v.id('interviews'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User is not authenticted');
    }

    const interviews = await ctx.db.query('interviews').collect();
    return interviews;
  },
});

export const getMyInterviews = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User is not authenticted');
    }

    const interviews = await ctx.db
      .query('interviews')
      .withIndex('by_candidate_id', (q) =>
        q.eq('candidateId', identity.subject)
      )
      .collect();
    return interviews;
  },
});

export const getInterviewByStreamCallId = query({
  args: {
    streamCallId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('interviews')
      .withIndex('by_stream_call_id', (q) =>
        q.eq('streamCallId', args.streamCallId)
      )
      .collect();
  },
});

export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.union(
      v.literal('succeded'),
      v.literal('failed'),
      v.literal('upcoming'),
      v.literal('completed')
    ),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User is not authenticted');
    }

    return await ctx.db.insert('interviews', {
      ...args,
    });
  },
});

export const updateInterviewStatus = mutation({
  args: {
    interviewId: v.id('interviews'),
    status: v.union(
      v.literal('succeded'),
      v.literal('failed'),
      v.literal('upcoming'),
      v.literal('completed')
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User is not authenticted');
    }

    return await ctx.db.patch(args.interviewId, {
      status: args.status,
      ...(args.status === 'completed' ? { endTime: Date.now() } : {}),
    });
  },
});
