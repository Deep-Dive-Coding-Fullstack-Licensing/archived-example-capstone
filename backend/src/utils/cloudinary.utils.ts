//TODO change the param to File instead Request
import { Request } from 'express'
const cloudinaryUtils = require('cloudinary').v2
let streamifier = require('streamifier');


/**
 * helper function that handles uploading images to cloudinary
 *
 * @param { Request} request express request object that conatins a file with a buffer
 * @return {string | Error} a string containing a secure_url returned from cloudinaryUtils or an error if the file upload fails
 */
export const uploadToCloudinary = (request : Request) : Promise<string | Error> => {

  cloudinaryUtils.config({
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: "cnm-ingenuity-deep-dive-bootcamp"
  })

  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinaryUtils.uploader.upload_stream(
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