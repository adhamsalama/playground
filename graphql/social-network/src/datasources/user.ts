import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Types } from "mongoose";
import { User } from "../models/user";
import { Context } from "../types/context";

export class UserDataSource extends DataSource<Context> {
  initialize(config: DataSourceConfig<Context>): void | Promise<void> {
    console.log({ config });
  }
  findById(id: string | Types.ObjectId) {
    return User.findById(id);
  }
  getAll() {
    return User.find({});
  }
  getByUsername(username: string) {
    return User.findOne({ username });
  }
  search(query: string) {
    return User.find({
      $or: [
        {
          firstName: query,
        },
        {
          lastName: query,
        },
      ],
    });
  }
}
