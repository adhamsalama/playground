import { Resolvers } from "../generated/graphql";
import { Product } from "../models/product";

export const resolvers: Resolvers = {
  Query: {
    products: async () => {
      return Product.find({});
    },
  },
  Mutation: {
    createProduct: async (_, { name, price, ownerId }) => {
      const product = new Product({ name, price, owner: ownerId });
      await product.save();
      return product;
    },
  },
  Product: {
    owner: async (product) => {
      const products = await Product.find({ owner: product.owner });
      return {
        id: product.owner,
        products,
      };
    },
  },
};
