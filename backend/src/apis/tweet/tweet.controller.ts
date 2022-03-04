import { Request, Response, NextFunction } from 'express'

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import { Tweet } from '../../utils/interfaces/Tweet'
import { Status } from '../../utils/interfaces/Status'
import { Profile } from '../../utils/interfaces/Profile'
import { insertTweet } from '../../utils/tweet/insertTweet'
import { selectAllTweets } from '../../utils/tweet/selectAllTweets'
import { selectTweetsByTweetProfileId } from '../../utils/tweet/selectTweetsByTweetProfileId'
import { selectTweetByTweetId } from '../../utils/tweet/selectTweetByTweetId'

export async function getAllTweetsController (request: Request, response: Response): Promise<Response<Status>> {
  try {
    const data = await selectAllTweets()
    // return the response
    const status: Status = { status: 200, message: null, data }
    return response.json(status)
  } catch (error) {
    return response.json({
      status: 500,
      message: '',
      data: []
    })
  }
}

export async function getTweetsByTweetProfileIdController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
  try {
    const { tweetProfileId } = request.params
    const data = await selectTweetsByTweetProfileId(tweetProfileId)
    return response.json({ status: 200, message: null, data })
  } catch (error) {
    return response.json({
      status: 500,
      message: '',
      data: []
    })
  }
}

export async function getTweetByTweetIdController (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
  try {
    const { tweetId } = request.params
    const data = await selectTweetByTweetId(tweetId)
    return response.json({ status: 200, message: null, data })
  } catch (error) {
    return response.json({
      status: 500,
      message: '',
      data: null
    })
  }
}

export async function postTweet (request: Request, response: Response): Promise<Response<Status>> {
  try {
    const { tweetContent } = request.body
    const profile: Profile = request.session.profile as Profile
    const tweetProfileId: string = profile.profileId as string

    const tweet: Tweet = {
      tweetId: null,
      tweetProfileId,
      tweetContent,
      tweetDate: null
    }
    const result = await insertTweet(tweet)
    const status: Status = {
      status: 200,
      message: result,
      data: null
    }
    return response.json(status)
  } catch (error) {
    return response.json({
      status: 500,
      message: 'Error Creating tweet try again later.',
      data: null
    })
  }
}
