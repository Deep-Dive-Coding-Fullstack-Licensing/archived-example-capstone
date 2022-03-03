import multer, { FileFilterCallback, StorageEngine } from 'multer'
import { Express, Request } from 'express'

/*
 * Single file upload handler that uses multer and multer memory storage to handle file validation
 * @see https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54
 */

const storage: StorageEngine = multer.memoryStorage()
const limits = { fields: 2, files: 1, parts: 2 }
const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  const { originalname } = file
  return (originalname.match(/\.(jpg|jpeg|png|gif)$/) != null)
    ? callback(null, true)
    : callback(null, false)
}

export const imageUploader = multer({ storage, limits, fileFilter }).single('image')
