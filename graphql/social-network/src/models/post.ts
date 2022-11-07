import { Schema, model } from "mongoose";
import { IPost } from "../types/post";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export const Post = model<IPost>("Post", postSchema);
