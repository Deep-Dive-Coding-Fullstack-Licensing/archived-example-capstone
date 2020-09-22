import { Router } from 'express';

import {imageUploader} from "../utils/controllers/multer.controller";
import {imageUploadController} from "../controllers/image-upload.contoller";

export const ImageUploadRouter = Router();

ImageUploadRouter.route('/')
  .post(imageUploader, imageUploadController);