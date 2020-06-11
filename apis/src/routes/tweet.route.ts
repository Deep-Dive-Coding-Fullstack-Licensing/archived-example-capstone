
import { Router } from 'express';
import { getAllTweets, insertTweet } from '../controllers/tweet.controller';
import { asyncValidator } from '../lib/asyncValidator';
import { tweetValidator } from '../validators/tweet.validator';
import {isLoggedIn} from "../validators/isLoggedIn.validator";
const { checkSchema } = require('express-validator');

const router = Router();

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
router.route('/')
  .get( getAllTweets)
  .post(asyncValidator(checkSchema(tweetValidator)), insertTweet);

export default router;
