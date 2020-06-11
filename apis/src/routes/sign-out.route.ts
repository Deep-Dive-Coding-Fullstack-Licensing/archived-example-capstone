import { Router } from 'express';
import {SignInRouter} from "./sign-in.route";
import {signOut} from "../controllers/sign-out.controller";

export const SignOutRoute = Router();

SignOutRoute.route("/")
  .get(signOut);
