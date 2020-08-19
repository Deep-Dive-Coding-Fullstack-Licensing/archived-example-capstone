import {NextFunction, Request, Response} from 'express';

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import {Tweet} from '../../utils/interfaces/Tweet';
import {Status} from '../interfaces/Status';
import {Profile} from "../interfaces/Profile";
import {insertTweet} from "../../utils/tweet/insertTweet"
import {selectAllTweets} from "../../utils/tweet/selectAllTweets";
import {selectTweetsByTweetProfileId} from "../../utils/tweet/selectTweetsByTweetProfileId";

const {validationResult} = require('express-validator');

export async function getAllTweets(request: Request, response: Response): Promise<Response | void> {

	try {

		const profile: Profile | string = request.session?.profile ?? "No user signed in";

		const data = await selectAllTweets()
		// return the response
		const status: Status = {status: 200, message: null, data};
		return response.json(status);
	} catch(error) {
		console.log(error);
	}
}

export async function getTweetByTweetProfileId(request : Request, response: Response, nextFunction: NextFunction){
  const 	{tweetProfileId} = request.params
	const data  = await selectTweetsByTweetProfileId(tweetProfileId)
	return response.json({status:200, message: null, data})
}

export async function postTweet(request: Request, response: Response) {
	try {
		validationResult(request).throw();



		const {tweetContent} = request.body;
		const profile: Profile = request.session?.profile

		// If the user is not logged in, return unauthorized
		if (profile == undefined){
				const status: Status = {
				status: 401,
				message: 'must be logged in to tweet',
				data: null
			};
				return response.json(status)
		}

		const tweetProfileId = <string>profile.profileId

		// const tweetProfileId = <string>request.session?.profile.profileId

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