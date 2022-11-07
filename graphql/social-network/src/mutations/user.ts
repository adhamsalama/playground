import { Resolvers } from "../generated/graphql";
import { User } from "../models/user";
// import { transformDocumentToGraphql } from "../utils/transform-document-to-graphql";
export const creatUserMutation: Resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      const user = new User({ ...input });
      await user.save();
      return {
        id: user._id.toString(),
        ...user.toObject(),
      };
    },
  },
};
