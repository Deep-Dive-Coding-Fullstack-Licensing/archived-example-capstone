import { Router } from 'express'
import { indexWelcome } from './index.controller.js'

const router: Router = Router()

router.route('/')
  .get(indexWelcome)

export default router
