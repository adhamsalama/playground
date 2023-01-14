import { shield, rule } from "graphql-shield";
import { Context } from "../types/context";

const isAuthenticated = rule()(
  (parent, args, ctx: Context, info) => ctx.user !== null
);

// Permissions
export const permissions = shield(
  {
    // Query: {
    //   frontPage: not(isAuthenticated),
    //   fruits: and(isAuthenticated, or(isAdmin, isEditor)),
    //   customers: and(isAuthenticated, isAdmin),
    // },
    Mutation: {
      createPost: isAuthenticated,
    },
  },
  {
    debug: true,
  }
);
