import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Types } from "mongoose";
import { User } from "../models/user";
import { Context } from "../types/context";
import DataLoader from "dataloader";
import { IUser } from "../types/user";
import { CreateUserInput } from "../generated/graphql";
import { ioresult, Result, Ok, Err } from "ioresult";
export class UserDataSource extends DataSource<Context> {
  private loaders: {
    user: DataLoader<string, IUser | null>;
    userByUsername: DataLoader<string, IUser | null | undefined>;
  };
  constructor() {
    super();
    this.loaders = {
      user: new DataLoader(async (keys) => {
        const users = await User.find({
          _id: { $in: keys },
        });
        const results = keys.map((key) => {
          const match = users.find((user) => user._id.toString() === key);
          if (!match) throw new Error("Something went wrong");
          return match;
        });
        return results;
      }),
      userByUsername: new DataLoader(async (keys) => {
        const users = await User.find({
          username: { $in: keys },
        });
        console.log({ users });

        const results = keys.map((key) => {
          return users.find((user) => user.username === key);
        });
        return results;
      }),
    };
  }

  async findById(id: string | Types.ObjectId) {
    // return User.findById(id);
    return await this.loaders.user.load(String(id));
  }
  async findByUsername(username: string) {
    return this.loaders.userByUsername.load(username);
  }
  async getAll() {
    return await User.find({});
  }
  getByUsername(username: string) {
    return User.findOne({ username });
  }
  async create({
    username,
    password,
  }: CreateUserInput): Promise<Result<IUser, string>> {
    const existingUser = await ioresult(
      this.loaders.userByUsername.load(username)
    );

    if (!existingUser.ok) {
      return new Err("Something went wrong while getting existing users");
    }
    if (existingUser.val) {
      return new Err("User already exists");
    }
    const user = new User({ username, password });
    await user.save();
    return new Ok(user);
  }
  search(query: string) {
    return User.find({
      username: query,
    });
  }
}
