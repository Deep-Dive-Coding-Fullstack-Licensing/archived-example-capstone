import { Request, Response } from 'express'
import { Status } from '../../utils/interfaces/Status'
import { Profile } from '../../utils/interfaces/Profile'
import { Like } from '../../utils/interfaces/Like'
import { selectLikeByLikeId } from '../../utils/like/selectLikeByLikeId'
import { deleteLike } from '../../utils/like/deleteLike'
import { insertLike } from '../../utils/like/insertLike'

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
    const selectedLike: Like|null = await selectLikeByLikeId(like)
    if (selectedLike === null) {
      await insertLike(like)
    } else {
      await deleteLike(like)
    }

    const status: Status = {
      status: 200,
      message: 'Like successfully updated',
      data: null
    }
    return response.json(status)
  } catch (error: any) {
    return (response.json({ status: 500, data: null, message: error.message }))
  }
}
