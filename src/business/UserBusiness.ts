import { InvalidParameterError } from "./../error/InvalidParameterError";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { User } from "../model/User";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private idGenerator: IdGenerator
  ) {}

  async signupListener(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string
  ): Promise<string> {
    if (!name || !email || !nickname || !password || role) {
      throw new InvalidParameterError("Invalid Parameters.");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 6) {
      throw new InvalidParameterError("Minimum password length: 6 characters.");
    }

    const id: string = this.idGenerator.generate();
    const hashPassword: string = await this.hashManager.hash(password);

    await this.userDatabase.signup(
      id,
      name,
      email,
      hashPassword,
      nickname,
      User.stringToUserRole(role.toUpperCase()),
      null
    );

    const accessToken = this.authenticator.generateToken({
      id,
      role: User.stringToUserRole(role.toUpperCase()),
    });

    return accessToken;
  }
}
