import { Resolvers } from "../generated/graphql";
import { Post } from "../models/post";
import { User } from "../models/user";
import { mutations } from "../mutations/index";
// A map of functions which return data for the schema.
export const resolvers: Resolvers = {
  Query: {
    posts: (_, args) => [
      {
        id: "420",
        title: "teto",
        content: "shakalala",
        user: {
          id: "69",
          firstName: "adhom",
          lastName: "salama",
          posts: [],
        },
      },
    ],
  },
  Mutation: {
    createUser: mutations.Mutation?.createUser,
    createPost: mutations.Mutation?.createPost,
  },
  Post: {
    user: async (post) => {
      console.log("Post->user");
      const user = await User.findById(post.user);
      if (!user) throw new Error("Error custom resolving post's user");
      return {
        id: String(user._id),
        ...user?.toObject(),
      };
    },
  },
  User: {
    posts: async (user) => {
      console.log("User->posts");
      const posts = await Post.find({ user });
      return posts.map((post) => {
        return {
          ...post.toObject(),
        };
      });
    },
  },
};
