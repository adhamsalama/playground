import { MutationResolvers } from "../generated/graphql";
import { Post } from "../models/post";
import { User } from "../models/user";

export const createPostMutation: MutationResolvers = {
  createPost: async (_, { input }) => {
    const user = await User.findById(input.userId);
    if (!user) throw new Error("User not found");
    const post = new Post({ ...input, user: input.userId });
    await post.save();
    return post;
  },
};
