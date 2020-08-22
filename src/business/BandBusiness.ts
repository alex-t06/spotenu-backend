import { InvalidParameterError } from "./../error/InvalidParameterError";
import { Band } from "./../model/Band";
import { User, UserRole } from "./../model/User";
import { BandDatabase } from "../data/BandDatabase";
import { Authenticator } from "../services/Authenticator";
import { NotFoundError } from "../error/NotFoundError";
import { UnauthorizedError } from "../error/UnauthorizedError";

export class BandBusiness {
  constructor(
    private bandDatabase: BandDatabase,
    private authenticator: Authenticator
  ) {}

  async getBands(token: string): Promise<any> {
    this.authenticator.getData(token);

    const bands = await this.bandDatabase.getBands();

    if (!bands) {
      throw new NotFoundError("Band not found.");
    }

    return bands;
  }

  async approveBand(token: string, id: string): Promise<string> {
    const user = this.authenticator.getData(token);

    if (User.stringToUserRole(user.role) !== UserRole.ADMIN) {
      throw new UnauthorizedError("Only administrators can approve a band.");
    }

    const band = await this.bandDatabase.findBand(id);

    if (!band) {
      throw new NotFoundError("Band not found!");
    }

    if (band.getRole() !== UserRole.BAND) {
      throw new InvalidParameterError("It's not a band.");
    }

    if (band.getApproved()) {
      throw new InvalidParameterError("It's already approved.");
    }

    await this.bandDatabase.approveBand(id);

    return "Success.";
  }
}
