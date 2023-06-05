import { Router } from 'express'

import { imageUploader } from '../../utils/controllers/multer.controller'
import { imageUploadController } from './image-upload.contoller'

export const imageUploadRoute = Router()

imageUploadRoute.route('/')
  .post(imageUploader, imageUploadController)
