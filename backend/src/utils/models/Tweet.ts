import { sql } from '../database.utils'

export interface Tweet {
  tweetId: string|null
  tweetProfileId: string
  tweetContent: string
  tweetDate: Date|null
}

export async function insertTweet (tweet: Tweet): Promise<string> {
  const {tweetProfileId, tweetContent} = tweet
  await sql `INSERT INTO tweet (tweet_id, tweet_profile_id, tweet_content, tweet_date) VALUES(gen_random_uuid(), ${tweetProfileId}, ${tweetContent}, NOW())`
  return 'Tweet created successfully'
}

export async function selectAllTweets (): Promise<Tweet[]> {
  return await sql <Tweet[]>`SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date FROM tweet ORDER BY tweet_date DESC`
}

export async function selectTweetByTweetId (tweetId: string): Promise<Tweet|null> {
  const result = <Tweet[]> await sql`SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date FROM tweet WHERE tweet_id = ${tweetId}`
  return result?.length === 1 ? result[0] : null
}

export async function selectTweetsByTweetProfileId (tweetProfileId: string): Promise<Tweet[]> {
  return <Tweet[]> await sql`SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date FROM tweet WHERE tweet_profile_id = ${tweetProfileId}`
}