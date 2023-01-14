import { Resolvers } from "../generated/graphql";
import { User } from "../models/user";
import { mutations } from "../mutations/index";
import { Context } from "../types/context";
import { IPost } from "../types/post";
import { IUser } from "../types/user";

export const resolvers: Resolvers<Context> = {
  Query: {
    search: async (_, { query }, context) => {
      const posts = await context.datasources.posts.search(query);
      const users = await context.datasources.users.search(query);
      const result: Array<IPost | IUser> = [...posts, ...users];
      return result;
    },
    posts: async (_, __, context) => context.datasources.posts.getAll(),
    postsByIds: (_, { ids }, context) =>
      context.datasources.posts.getByIds(ids),
    user: async (_, { id }, context) => context.datasources.users.findById(id),
    users: async (_, __, context) => context.datasources.users.getAll(),
    getCurrentUser: async (_, __, context) =>
      context.user ? context.user : null,
  },
  Mutation: {
    createUser: mutations.createUser,
    createPost: mutations.createPost,
  },
  Post: {
    user: async (post, _, context) => {
      const user = await context.datasources.users.findById(post.user);
      if (!user) throw new Error("Error custom resolving post's user");
      return user;
    },
  },
  User: {
    posts: async (user, _, context) =>
      context.datasources.posts.getByUserId(user.id),
  },
  SearchResult: {
    __resolveType(searchResult) {
      return searchResult instanceof User ? "User" : "Post";
    },
  },
};
