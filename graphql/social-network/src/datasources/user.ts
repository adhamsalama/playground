import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Types } from "mongoose";
import { User } from "../models/user";
import { Context } from "../types/context";
import DataLoader from "dataloader";
import { IUser } from "../types/user";
export class UserDataSource extends DataSource<Context> {
  private loaders: {
    user: DataLoader<string, IUser>;
  };
  constructor() {
    super();
    this.loaders = {
      user: new DataLoader(async (keys) => {
        const users = await User.find({
          _id: { $in: keys },
        });
        const results = keys.map((key) => {
          const match = users.find((Post) => Post._id.toString() === key);
          if (!match) throw new Error("Something went wrong");
          return match;
        });
        return results;
      }),
    };
  }

  async findById(id: string | Types.ObjectId) {
    // return User.findById(id);
    return await this.loaders.user.load(String(id));
  }
  async getAll() {
    return await User.find({});
  }
  getByUsername(username: string) {
    return User.findOne({ username });
  }
  search(query: string) {
    return User.find({
      username: query,
    });
  }
}
