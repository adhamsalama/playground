import DataLoader from "dataloader";
import { Post } from "../models/post";
import { User } from "../models/user";

export const userDataLoader = new DataLoader(async (keys) => {
  const users = await User.find({ _id: { $in: keys } });
  return keys.map(key => users.find(user => user._id.toString() === key));
});

const postDataLoader = new DataLoader(async (keys) => {
  const posts = await Post.find({ user: { $in: keys } });
  return keys.map(key => posts.find(post => post._id.toString() === key));
});
