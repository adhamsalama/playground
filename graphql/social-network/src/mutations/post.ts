import { Resolvers } from "../generated/graphql";
import { Post } from "../models/post";
import { User } from "../models/user";
// import { transformDocumentToGraphql } from "../utils/transform-document-to-graphql";
export const createPostMutation: Resolvers = {
  Mutation: {
    createPost: async (_, { input }) => {
      const user = await User.findById(input.userId);
      if (!user) throw new Error("User not found");
      const post = new Post({ ...input, user: input.userId });
      await post.save();
      console.log({ post });
      return {
        id: post._id.toString(),
        ...post.toObject(),
      };
    },
  },
};
