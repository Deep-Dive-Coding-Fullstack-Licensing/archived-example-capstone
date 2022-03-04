import { Router } from 'express'
import { signOutController } from './sign-out.controller'

export const SignOutRoute: Router = Router()

SignOutRoute.route('/')
  .get(signOutController)
