import { Resolvers } from "../generated/graphql";
import { Post } from "../models/post";
import { User } from "../models/user";
import { mutations } from "../mutations/index";

export const resolvers: Resolvers = {
  Query: {
    search: async (_, { query }) => {
      const posts = await Post.find({
        $or: [
          {
            title: query,
          },
          {
            content: query,
          },
        ],
      });
      const users = await User.find({
        $or: [
          {
            firstName: query,
          },
          {
            lastName: query,
          },
        ],
      });
      // @ts-ignore
      const result = posts.concat(users);
      return result;
    },
    posts: async (_, __, context) => {
      console.log({ _, __: context });
      const posts = await Post.find();
      return posts;
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    },
    users: async () => {
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    createUser: mutations.Mutation?.createUser,
    createPost: mutations.Mutation?.createPost,
  },
  Post: {
    user: async (post) => {
      const user = await User.findById(post.user);
      if (!user) throw new Error("Error custom resolving post's user");
      return user;
    },
  },
  User: {
    posts: async (user) => {
      const posts = await Post.find({ user });
      return posts;
    },
  },
  SearchResult: {
    __resolveType(searchResult) {
      if (searchResult instanceof User) {
        return "User";
      }
      return "Post";
    },
  },
};
