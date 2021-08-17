
import { Router } from 'express';
import {
	getAllTweetsController,
	getTweetByTweetIdController,
	getTweetsByTweetProfileIdController,
	postTweet
} from './tweet.controller';
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller';
import { tweetValidator } from './tweet.validator';
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {check} from 'express-validator';
import {checkSchema} from 'express-validator';

const router = Router();
router.route("/:tweetId").get(  asyncValidatorController([
	check("tweetId", "please provide a valid tweetId").isUUID()
]), getTweetByTweetIdController)


router.route("/tweetProfileId/:tweetProfileId").get(  asyncValidatorController([
	check("tweetProfileId", "please provide a valid tweetProfileId").isUUID()
]), getTweetsByTweetProfileIdController)

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
router.route('/')
  .get( getAllTweetsController)
  .post(isLoggedIn, asyncValidatorController(checkSchema(tweetValidator)), postTweet);

export default router;
