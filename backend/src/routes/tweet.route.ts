
import { Router } from 'express';
import {getAllTweetsController, getTweetsByTweetProfileIdController, postTweet} from '../controllers/tweet.controller';
import { asyncValidatorController } from '../utils/controllers/asyncValidator.controller';
import { tweetValidator } from '../validators/tweet.validator';
import {isLoggedIn} from "../utils/controllers/isLoggedIn.controller";
const { checkSchema } = require('express-validator');

const router = Router();

router.route("/tweetProfileId/:tweetProfileId").get(getTweetsByTweetProfileIdController)

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
router.route('/')
  .get( getAllTweetsController)
  .post(isLoggedIn, asyncValidatorController(checkSchema(tweetValidator)), postTweet);

export default router;
