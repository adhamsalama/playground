import DataLoader from "dataloader";
import { Post } from "../models/post";
import { User } from "../models/user";

export const userDataLoader = new DataLoader(async (keys) => {
  const users = await User.find({ _id: { $in: keys } });
  return users;
});

const postDataLoader = new DataLoader(async (keys) => {
  const posts = await Post.find({ user: { $in: keys } });
  return posts;
});
