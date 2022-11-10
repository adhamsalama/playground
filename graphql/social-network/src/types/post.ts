import { Types } from "mongoose";

export interface IPost {
  id: string;
  title: string;
  content?: string;
  user: Types.ObjectId;
}
