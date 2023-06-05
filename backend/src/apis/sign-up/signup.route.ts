import { Router } from 'express'
import { signupProfileController } from './sign-up.controller'
import { signupValidator } from './signup.validator'
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { activationController } from './activation.controller'
import { param, checkSchema } from 'express-validator'

export const signUpRoute: Router = Router()

signUpRoute.route('/')
  .post(
    asyncValidatorController(checkSchema(signupValidator)),
    signupProfileController
  )

signUpRoute.route('/activation/:activation')
  .get(
    asyncValidatorController([param('activation', 'invalid activation link').isHexadecimal().notEmpty()]),
    activationController
  )


