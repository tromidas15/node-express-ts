import UserModel, { UserModelType } from "../models/userModel";

export default class UserRepository {
  protected visible: string[] = ["name", "email", "_id"];

  public async updateUser(
    id: string,
    email: string,
    name: string
  ): Promise<UserModelType | null> {
    let user = await this.findUserById(id);

    if (!user) return null;

    user.email = email;
    user.name = name;
    user.save();
    return user;
  }

  public async findUserById(id: string) {
    return await UserModel.findOne({ _id: id }).select(this.visible.join(" "));
  }

  public async findUserWithRole(id: string) {
    return await UserModel.findOne({ _id: id })
      .select(this.visible.join(" "))
      .populate({
        path: "role",
      });
  }
}
