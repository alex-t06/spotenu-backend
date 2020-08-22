import { UserRole, User } from "./../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  protected static TABLE_NAME = "UserSpotenu";

  public async signup(
    id: string,
    name: string,
    email: string,
    password: string,
    nickname: string,
    role: UserRole,
    description: string | null,
    approved: boolean
  ): Promise<any> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
          nickname,
          role,
          description,
          approved,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getEspecificUser(user: string): Promise<User | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ nickname: user })
        .orWhere({ email: user });

      if (result.length > 0) {
        return User.toUserModel(result[0]);
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
