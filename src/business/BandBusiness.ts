import { BandDatabase } from "../data/BandDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { NotFoundError } from "../error/NotFoundError";

export class BandBusiness {
  constructor(
    private bandDatabase: BandDatabase,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) {}

  async getBands(token: string): Promise<any> {
    this.authenticator.getData(token);
    const bands = await this.bandDatabase.getBands();

    if (!bands) {
      throw new NotFoundError("Band not found.");
    }

    return bands;
  }
}
