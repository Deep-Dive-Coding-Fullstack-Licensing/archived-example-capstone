import {Schema} from "express-validator";

export const profileValidator : Schema = {
  profileId: {
    isUUID: {
      errorMessage: 'please provide a valid TweetProfileId'
    }
  },
  profileAtHandle: {
    escape: true,
    trim: true,
    isLength: {
      errorMessage: 'profileAtHandle must be between seven and thirty two characters',
      options: {min:1, max: 32 }
    }
  },
  profileAvatarUrl: {
    optional: {
      options: {
        nullable: true
      }
    },
    isURL: {
      errorMessage: "profile avatar is malformed please upload a new image"
    },
  },
  profileEmail: {
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    trim: true
  },
  profilePhone: {
    isMobilePhone: {
      errorMessage: "please provide a valid mobile phone number"
    },
    optional: {
      options: {
        nullable: true
      }
    }
  }
};