import { Request } from 'express'
import {v2 as cloudinaryUtils, UploadStream} from 'cloudinary'
let streamifier = require('streamifier');


/**
 * helper function that handles uploading images to cloudinary
 *
 * @param { Request} request express request object that contains a file with a buffer
 * @return {string} a string containing a secure_url returned from cloudinaryUtils.
 */
export const uploadToCloudinary = (request : Request) : Promise<string> => {

  cloudinaryUtils.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: "cnm-ingenuity-deep-dive-bootcamp"
  })

  return new Promise((resolve, reject):void => {
    let cld_upload_stream: UploadStream = cloudinaryUtils.uploader.upload_stream(
      (error: Error, cloudinaryResult: any) => {
        if (cloudinaryResult) {
          resolve(cloudinaryResult.secure_url);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(request.file.buffer).pipe(cld_upload_stream);
  });

}