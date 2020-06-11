import { Router } from 'express';
import { signupProfile } from '../controllers/sign-up.controller';
import { signupValidator } from '../validators/signup.validator';
import { asyncValidator } from '../lib/asyncValidator';

const { checkSchema } = require('express-validator');

const router = Router();

router.route('/')
  .post(asyncValidator(checkSchema(signupValidator)), signupProfile);

export default router;
