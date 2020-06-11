export const tweetValidator = {
  tweetProfileId: {
    isUUID: {
      errorMessage: 'please provide a validTweetProfileId'
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

};
