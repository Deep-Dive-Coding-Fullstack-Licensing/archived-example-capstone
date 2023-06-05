import { Router } from 'express'
import { getLikesByLikeTweetId, toggleLikeController } from './like.controller'
import { isLoggedIn } from '../../utils/controllers/isLoggedIn.controller'
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { check } from 'express-validator'

export const likeRoute = Router()

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
likeRoute.route('/')
  .post(isLoggedIn, toggleLikeController)
likeRoute.route('/likeTweetId/:likeTweetId')
  .get(asyncValidatorController([
    check('likeTweetId', 'please provide a valid likeTweetId').isUUID()
  ]), getLikesByLikeTweetId)

