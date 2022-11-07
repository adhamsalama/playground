import { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);
