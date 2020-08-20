import { Router } from 'express';
import {signOutController} from "../controllers/sign-out.controller";

export const SignOutRoute = Router();

SignOutRoute.route("/")
  .get(signOutController);
