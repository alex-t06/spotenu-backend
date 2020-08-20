import { BandDTO } from "./../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
  protected static TABLE_NAME = "UserSpotenu";

  public async getBands(): Promise<BandDTO[]> {
    try {
      let result = undefined;

      result = await this.getConnection()
        .select("name", "email", "nickname", "approved")
        .from(BandDatabase.TABLE_NAME)
        .where({ role: "BAND" });

      if (result !== undefined) {
        return result;
      }
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
