import { InvalidParameterError } from "../error/InvalidParameterError";

export class User {
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
}

export enum UserRole {
  NORMAL = "NORMAL",
  PREMIUM = "PREMIUM",
  ADMIN = "ADMIN",
  BAND = "BAND",
}
