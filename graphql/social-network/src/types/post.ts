import { Types } from "mongoose";

export interface IPost {
  title: string;
  content?: string;
  user: Types.ObjectId;
}
