import { MutationResolvers } from "../generated/graphql";
import { User } from "../models/user";
import { Context } from "../types/context";
import jwt from "jsonwebtoken";

export const creatUserMutation: MutationResolvers<Context> = {
  createUser: async (_, { input }, context) => {
    const user = await context.datasources.users.create(input);
    if (!user.ok) {
      throw new Error(user.val);
    }
    const token = jwt.sign(
      { ...user.val, id: user.val.id },
      process.env.JWT_SECRET!
    );
    context.res.setHeader("authorization", token);
    return user.val;
  },
};
