import { Response } from "express";
import { IUser } from "./user";
import { User } from "../models/user";
import { Post } from "../models/post";
import { UserDataSource } from "../datasources/user";
import { PostDataSource } from "../datasources/post";

export interface Context {
  user: IUser | null;
  res: Response;
  models: Models;
  datasources: {
    users: UserDataSource;
    posts: PostDataSource;
  };
}

interface Models {
  user: typeof User;
  post: typeof Post;
}
