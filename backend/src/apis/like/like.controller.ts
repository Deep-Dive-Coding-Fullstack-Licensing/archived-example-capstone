import { NextFunction, Request, Response } from 'express'
import { Status } from '../../utils/interfaces/Status'
import { Profile } from '../../utils/interfaces/Profile'
import { Like } from '../../utils/interfaces/Like'
import { selectLikeByLikeId } from '../../utils/like/selectLikeByLikeId'
import { deleteLike } from '../../utils/like/deleteLike'
import { insertLike } from '../../utils/like/insertLike'
import { selectTweetsByTweetProfileId } from '../../utils/tweet/selectTweetsByTweetProfileId'
import { selectLikesByLikeTweetId } from '../../utils/like/selectLikesByLikeTweetId'

export async function getLikesByLikeTweetId (request: Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>> {
  try {
    const { likeTweetId } = request.params
    const data = await selectLikesByLikeTweetId(likeTweetId)
    return response.json({ status: 200, message: null, data })
  } catch (error) {
    return response.json({
      status: 500,
      message: '',
      data: []
    })
  }
}

export async function toggleLikeController (request: Request, response: Response): Promise<Response<string>> {
  try {
    const { likeTweetId } = request.body
    const profile = request.session.profile as Profile
    const likeProfileId = profile.profileId as string

    const like: Like = {
      likeProfileId,
      likeTweetId,
      likeDate: null
    }

    let status: Status = {
      status: 200,
      message: '',
      data: null
    }

    const selectedLike: Like|null = await selectLikeByLikeId(like)
    if (selectedLike === null) {
      status.message = await insertLike(like)
    } else {
      status.message = await deleteLike(like)
    }


    return response.json(status)
  } catch (error: any) {
    return (response.json({ status: 500, data: null, message: error.message }))
  }
}
