
import { Router } from 'express'
import {
  getAllTweetsController,
  getTweetByTweetIdController,
  getTweetsByTweetProfileIdController,
  postTweet
} from './tweet.controller'
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller'
import { check, checkSchema } from 'express-validator'
import { isLoggedIn } from '../../utils/controllers/isLoggedIn.controller'
import { tweetValidator } from './tweet.validator'

export const tweetRoute = Router()
tweetRoute.route('/:tweetId').get(asyncValidatorController([
  check('tweetId', 'please provide a valid tweetId').isUUID()
]), getTweetByTweetIdController)

tweetRoute.route('/tweetProfileId/:tweetProfileId').get(asyncValidatorController([
  check('tweetProfileId', 'please provide a valid tweetProfileId').isUUID()
]), getTweetsByTweetProfileIdController)

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
tweetRoute.route('/')
  .get(getAllTweetsController)
  .post(isLoggedIn,asyncValidatorController(checkSchema((tweetValidator))) ,postTweet)

