import { Resolvers } from "../generated/graphql";
import { creatUserMutation } from "./user";
import { createPostMutation } from "./post";

export const mutations: Resolvers = {
  Mutation: {
    createUser: creatUserMutation.Mutation?.createUser,
    createPost: createPostMutation.Mutation?.createPost,
  },
};
