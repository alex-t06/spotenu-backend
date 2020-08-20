import { InvalidParameterError } from "../error/InvalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private nickname: string,
    private role: UserRole,
    private approved: boolean
  ) {}

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getNickname() {
    return this.nickname;
  }

  public getRole() {
    return this.role;
  }

  public getApproved() {
    return this.approved;
  }

  public static stringToUserRole(input: string): UserRole {
    switch (input) {
      case "NORMAL":
        return UserRole.NORMAL;
      case "PREMIUM":
        return UserRole.PREMIUM;
      case "ADMIN":
        return UserRole.ADMIN;
      case "BAND":
        return UserRole.BAND;
      default:
        throw new InvalidParameterError("Invalid user role.");
    }
  }

  public static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.nickname,
      User.stringToUserRole(user.role),
      user.approved
    );
  }
}

export enum UserRole {
  NORMAL = "NORMAL",
  PREMIUM = "PREMIUM",
  ADMIN = "ADMIN",
  BAND = "BAND",
}

export interface UserInputDTO {
  name: string;
  email: string;
  password: string;
  nickname: string;
  role: string;
}

export interface LoginInputDTO {
  user: string;
  password: string;
}
