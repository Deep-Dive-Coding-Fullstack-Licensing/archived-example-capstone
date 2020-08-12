import { Router } from 'express';
import { asyncValidator } from '../lib/asyncValidator';
import { signInValidator } from '../validators/sign-in.validator';
import {signIn} from "../controllers/sign-in.controller";

const { checkSchema } = require('express-validator');

export const SignInRouter = Router();

SignInRouter.route('/')
  .post(asyncValidator(checkSchema(signInValidator)), signIn);
