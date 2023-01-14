import { MutationResolvers } from "../generated/graphql";
import { creatUserMutation } from "./user";
import { createPostMutation } from "./post";
import { Context } from "../types/context";

export const mutations: MutationResolvers<Context> = {
    createUser: creatUserMutation.createUser,
    createPost: createPostMutation.createPost,
};
