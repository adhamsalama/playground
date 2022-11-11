import { Schema, model } from "mongoose";
import { IProduct } from "../types/product";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

export const Product = model("Product", productSchema);
