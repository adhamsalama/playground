import { MutationResolvers } from "../generated/graphql";
import { User } from "../models/user";
import { Context } from "../types/context";
import jwt from "jsonwebtoken";

export const creatUserMutation: MutationResolvers<Context> = {
  createUser: async (_, { input }, context) => {
    const user = new User({ ...input });
    await user.save();
    const token = jwt.sign(
      { ...user.toJSON(), id: user.id },
      process.env.JWT_SECRET!
    );
    context.res.setHeader("authorization", token);
    return user;
  },
};
