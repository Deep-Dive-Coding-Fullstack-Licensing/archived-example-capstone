import { Status } from '../../utils/interfaces/Status'
import { Request, Response } from 'express'

export function signOutController (request: Request, response: Response): Response<Status> {
  const status: Status = { status: 200, message: 'sign out successful', data: null }
  const { session } = request
  session?.destroy(() => {})
  return response.json(status)
}
