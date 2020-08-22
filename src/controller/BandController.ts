import { BandBusiness } from "./../business/BandBusiness";
import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export class BandController {
  private static BandBusiness = new BandBusiness(
    new BandDatabase(),
    new Authenticator()
  );

  public async getBand(req: Request, res: Response) {
    try {
      const result = await BandController.BandBusiness.getBands(
        req.headers.authorization
      );

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.code || 400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  public async approveBand(req: Request, res: Response) {
    try {
      const result = await BandController.BandBusiness.approveBand(
        req.headers.authorization,
        req.params.id
      );

      res.status(200).send({ result });
    } catch (error) {
      res.status(error.code || 400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
