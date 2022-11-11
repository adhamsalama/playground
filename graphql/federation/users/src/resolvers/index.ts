import { Resolvers } from "../generated/graphql";
import { User } from "../models/user";

export const resolvers: Resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
  },
  Mutation: {
    createUser: async (_, { username, password }) => {
      const user = new User({ username, password });
      await user.save();
      return user;
    },
  },
  User: {
    // @ts-ignore I don't know how to add resolveReference to the generated GraphQL code
    __resolveReference(ref: { id: string }): User {
      return User.findById(ref.id);
    },
  },
};
