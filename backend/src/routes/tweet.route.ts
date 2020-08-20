
import { Router } from 'express';
import {getAllTweetsController, getTweetByTweetProfileIdController, postTweet} from '../controllers/tweet.controller';
import { asyncValidatorController } from '../controllers/asyncValidator.controller';
import { tweetValidator } from '../validators/tweet.validator';
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
const { checkSchema } = require('express-validator');

const router = Router();

router.route("/tweetProfileId/:tweetProfileId").get(getTweetByTweetProfileIdController)

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
router.route('/')
  .get( getAllTweetsController)
  .post(isLoggedIn, asyncValidatorController(checkSchema(tweetValidator)), postTweet);

export default router;
