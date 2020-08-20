import { UserRole } from "./../model/User";
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
        .insert({ id, name, email, password, nickname, role, description, approved })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
