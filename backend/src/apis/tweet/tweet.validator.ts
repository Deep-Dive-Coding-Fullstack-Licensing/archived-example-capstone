import { Schema } from 'express-validator'

export const tweetValidator: Schema = {
  tweetProfileId: {
    isUUID: {
      errorMessage: 'please provide a valid TweetProfileId'
    }
  },
  tweetContent: {
    isLength: {
      errorMessage: 'a tweet cannot be longer than 140 characters',
      options: { max: 140 }
    },
    trim: true,
    escape: true
  },
  tweetDate: {
    toDate: true
  }
}
