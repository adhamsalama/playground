import { MutationResolvers } from "../generated/graphql";
import { Context } from "../types/context";

export const createPostMutation: MutationResolvers<Context> = {
  createPost: async (_, { input }, context) => {
    const user = await context.datasources.users.findById(context.user!.id);
    if (!user) throw new Error("User not found");
    return context.datasources.posts.create(input, context.user!.id);
  },
};
