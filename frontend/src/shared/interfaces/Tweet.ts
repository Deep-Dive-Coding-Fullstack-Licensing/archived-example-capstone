
export interface Tweet extends PartialTweet{
  tweetId: string|null

}

export interface PartialTweet {
  tweetProfileId: string
  tweetContent: string
  tweetDate: Date|null
}

