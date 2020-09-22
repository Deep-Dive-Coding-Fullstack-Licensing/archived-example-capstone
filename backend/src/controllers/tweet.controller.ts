import {Request, Response, NextFunction} from 'express';

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import {Tweet} from '../utils/interfaces/Tweet';
import {Status} from '../utils/interfaces/Status';
import {Profile} from "../utils/interfaces/Profile";
import {insertTweet} from "../utils/tweet/insertTweet"
import {selectAllTweets} from "../utils/tweet/selectAllTweets";
import {selectTweetsByTweetProfileId} from "../utils/tweet/selectTweetsByTweetProfileId";

const {validationResult} = require('express-validator');

export async function getAllTweetsController(request: Request, response: Response): Promise<Response | void> {

	try {
		const data = await selectAllTweets()
		// return the response
		const status: Status = {status: 200, message: null, data};
		return response.json(status);
	} catch(error) {
		console.log(error);
	}
}

export async function getTweetsByTweetProfileIdController(request : Request, response: Response, nextFunction: NextFunction){
	const     {tweetProfileId} = request.params
	const data  = await selectTweetsByTweetProfileId(tweetProfileId)
	return response.json({status:200, message: null, data})
}

export async function postTweet(request: Request, response: Response) {
	try {

		const {tweetContent} = request.body;

		const tweetProfileId = <string>request.session?.profile.profileId

		const tweet: Tweet = {
			tweetId: null,
			tweetProfileId,
			tweetContent,
			tweetDate: null
		}
		const result = await insertTweet(tweet)
		const status: Status = {
			status: 200,
			message: result ?? 'Tweet successfully created',
			data: null
		};
		return response.json(status);

	} catch(error) {
		console.log(error);
	}
}



// export async function deleteTweet(request: Request, response: Response) {
// 	try {
// 		const {tweetId} = request.body;
// 		const result = await deleteTweet(tweetId)
// 		const status: Status = {status: 200, data, message: null}
// 		return response.json(status)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }