import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Types } from "mongoose";
import { Post } from "../models/post";
import { Context } from "../types/context";
import DataLoader from "dataloader";
import { IPost } from "../types/post";
export class PostDataSource extends DataSource<Context> {
  private loaders: {
    post: DataLoader<string, IPost>;
  };
  constructor() {
    console.log("post loader");
    super();
    this.loaders = {
      post: new DataLoader(async (keys) => {
        const Posts = await Post.find({
          _id: { $in: keys },
        });
        const results = keys.map((key) => {
          const match = Posts.find((Post) => Post._id.toString() === key);
          if (!match) throw new Error("Something went wrong");
          return match;
        });
        return results;
      }),
    };
  }

  async findById(id: string | Types.ObjectId) {
    // return Post.findById(id);
    return this.loaders.post.load(String(id));
  }
  getByUserId(id: string | Types.ObjectId) {
    return Post.find({ user: String(id) });
  }

  async getAll() {
    return Post.find({});
  }
  getByTitle(title: string) {
    return Post.findOne({ title });
  }
  getByIds(ids: string[]) {
    // return Post.find({ _id: { $in: ids } });
    return this.loaders.post.loadMany(ids);
  }
  search(query: string) {
    return Post.find({
      title: query,
    });
  }
}
