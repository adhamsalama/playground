import { MutationResolvers } from "../generated/graphql";
import { User } from "../models/user";

export const creatUserMutation: MutationResolvers = {
  createUser: async (_, { input }) => {
    const user = new User({ ...input });
    await user.save();
    return user;
  },
};
