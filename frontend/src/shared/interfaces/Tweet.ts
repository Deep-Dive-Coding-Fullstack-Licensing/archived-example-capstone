
export interface Tweet extends PartialTweet{
  tweetId: string,
  tweetDate: string

}

export interface PartialTweet {
  tweetProfileId: string
  tweetContent: string
}

