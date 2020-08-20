import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/listener/signup", userController.signupListener);
userRouter.post("/admin/signup", userController.signupAdmin);
userRouter.post("/band/signup", userController.signupBand);
