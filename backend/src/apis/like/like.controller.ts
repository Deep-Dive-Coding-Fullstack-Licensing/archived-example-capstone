import { NextFunction, Request, Response } from 'express'
import { Status } from '../../utils/interfaces/Status'
import { Profile } from '../../utils/models/Profile'
import { deleteLike, insertLike, Like, selectLikeByLikeId, selectLikesByLikeTweetId } from '../../utils/models/Like'

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

    const status: Status = {
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
