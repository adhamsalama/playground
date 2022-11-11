import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Post } from "../models/post";
import { Context } from "../types/context";
import { Types } from "mongoose";

export class PostDataSource extends DataSource<Context> {
  initialize(config: DataSourceConfig<Context>): void | Promise<void> {
    console.log({ config });
  }
  findById(id: string | Types.ObjectId) {
    return Post.findById(id);
  }
  getAll() {
    return Post.find({});
  }
  getByTitle(title: string) {
    return Post.findOne({ title });
  }
  getByUserId(id: string) {
    return Post.find({ user: id });
  }
  search(query: string) {
    return Post.find({
      $or: [
        {
          title: query,
        },
        {
          content: query,
        },
      ],
    });
  }
}
