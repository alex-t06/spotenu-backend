import { BandInputDTO } from "./../model/Band";
import { UserInputDTO, LoginInputDTO } from "./../model/User";
import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BaseDatabase } from "../data/BaseDatabase";

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
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  public async signupAdmin(req: Request, res: Response) {
    try {
      const { name, email, nickname, password, role }: UserInputDTO = req.body;

      const result = await UserController.UserBusiness.signupAdmin(
        name,
        email,
        nickname,
        password,
        role,
        req.headers.authorization
      );

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.errorCode || 400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  public async signupBand(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        nickname,
        password,
        role,
        description,
      }: BandInputDTO = req.body;

      const result = await UserController.UserBusiness.signupBand(
        name,
        email,
        nickname,
        password,
        role,
        description
      );

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.errorCode || 400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async login(req: Request, res: Response) {
    try {
      const input: LoginInputDTO = {
        user: req.body.user,
        password: req.body.password,
      };

      const token = await UserController.UserBusiness.login(input);

      res.status(200).send({ token });
    } catch (error) {
      res.status(error.errorCode || 400).send({ message: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
