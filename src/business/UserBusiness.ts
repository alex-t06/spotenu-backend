import { UserRole } from "./../model/User";
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
    if (!name || !email || !nickname || !password || !role) {
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
    const userRole: UserRole = User.stringToUserRole(role.toUpperCase());
    let approved: boolean = undefined;

    if (userRole === UserRole.PREMIUM || userRole === UserRole.NORMAL) {
      approved = true;
    }

    await this.userDatabase.signup(
      id,
      name,
      email,
      hashPassword,
      nickname,
      userRole,
      null,
      approved
    );

    const accessToken = this.authenticator.generateToken({
      id,
      role: User.stringToUserRole(role.toUpperCase()),
    });

    return accessToken;
  }

  async signupAdmin(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string,
    token: string
  ): Promise<string> {
    if (!name || !email || !nickname || !password || !role) {
      throw new InvalidParameterError("Invalid Parameters.");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 10) {
      throw new InvalidParameterError(
        "Minimum password length: 10 characters."
      );
    }

    const id: string = this.idGenerator.generate();
    const hashPassword: string = await this.hashManager.hash(password);
    const userRole: UserRole = User.stringToUserRole(role.toUpperCase());
    let approved: boolean = undefined;

    approved = true;

    const userData = this.authenticator.getData(token);

    if (User.stringToUserRole(userData.role) !== UserRole.ADMIN) {
      throw new InvalidParameterError(
        "you need to be an administrator to register another administrator."
      );
    }

    await this.userDatabase.signup(
      id,
      name,
      email,
      hashPassword,
      nickname,
      userRole,
      null,
      approved
    );

    const accessToken = this.authenticator.generateToken({
      id,
      role: User.stringToUserRole(role.toUpperCase()),
    });

    return accessToken;
  }

  async signupBand(
    name: string,
    email: string,
    nickname: string,
    password: string,
    role: string,
    description: string
  ): Promise<string> {
    if (!name || !email || !nickname || !password || !role || !description) {
      throw new InvalidParameterError("Invalid Parameters.");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 6) {
      throw new InvalidParameterError(
        "Minimum password length: 6 characters."
      );
    }

    const id: string = this.idGenerator.generate();
    const hashPassword: string = await this.hashManager.hash(password);
    const userRole: UserRole = User.stringToUserRole(role.toUpperCase());
    let approved: boolean = undefined;

    approved = false;

    await this.userDatabase.signup(
      id,
      name,
      email,
      hashPassword,
      nickname,
      userRole,
      description,
      approved
    );

    return "Band created!";
  }
}
