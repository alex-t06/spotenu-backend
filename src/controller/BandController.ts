import { BandBusiness } from "./../business/BandBusiness";
import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";

export class BandController {
  private static BandBusiness = new BandBusiness(
    new BandDatabase(),
    new HashManager(),
    new Authenticator(),
    new IdGenerator()
  );

  public async getBand(req: Request, res: Response) {
    try {
      const result = await BandController.BandBusiness.getBands(
        req.headers.authorization,
      );

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.code || 400).send({ error: error.message });
    }
  }
}
