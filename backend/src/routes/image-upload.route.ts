import { Router } from 'express';

import {imageUploader} from "../lib/multer";
import {imageUploadController} from "../controllers/image-upload.contoller";

export const ImageUploadRouter = Router();

ImageUploadRouter.route('/')
  .post(imageUploader, imageUploadController);