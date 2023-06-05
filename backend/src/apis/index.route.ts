import { Router } from 'express'
import { indexWelcome } from './index.controller'

export const indexRoute: Router = Router()

indexRoute.route('/')
  .get(indexWelcome)


