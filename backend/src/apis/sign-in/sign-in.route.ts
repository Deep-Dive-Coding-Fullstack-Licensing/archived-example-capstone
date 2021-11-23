import { Router } from 'express';
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller';
import { signInValidator } from './sign-in.validator';
import {signInController} from "./sign-in.controller";
import {checkSchema} from 'express-validator';

export const SignInRouter: Router = Router();

SignInRouter.route('/')
  .post(asyncValidatorController(checkSchema(signInValidator)) ,signInController);
