import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase {
  protected static TABLE_NAME = "UserSpotenu";

  public async getBands(): Promise<Band | undefined> {
    try {
      let result = undefined;

      result = await this.getConnection()
        .select('*')
        .from(BandDatabase.TABLE_NAME)
        .where({ role: "BAND" });

      return Band.toBandModel(result[0]);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
