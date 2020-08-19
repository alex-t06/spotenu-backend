import { UserInputDTO } from "./../model/UserListener";
import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashManager(),
    new Authenticator(),
    new IdGenerator()
  );

  public async signupListener(req: Request, res: Response) {
    try {
      const { name, email, nickname, password, role }: UserInputDTO = req.body;

      const result = await UserController.UserBusiness.signupListener(
        name,
        email,
        nickname,
        password,
        role
      );

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.errorCode || 400).send({ error: error.message });
    }
  }
}
