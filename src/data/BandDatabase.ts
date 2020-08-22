import { User } from "./../model/User";
import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
  protected static TABLE_NAME = "UserSpotenu";

  public async getBands(): Promise<Band | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ role: "BAND" });

      if (result.length > 0) {
        return Band.toBandModel(result[0]);
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findBand(id: string): Promise<User | undefined> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({ id: id });

      if (result.length > 0) {
        return User.toUserModel(result[0]);
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async approveBand(id: string): Promise<any> {
    try {
      await this.getConnection()
        .update({ approved: true })
        .from(BandDatabase.TABLE_NAME)
        .where({ id });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
