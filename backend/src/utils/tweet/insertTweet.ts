import { Tweet } from '../interfaces/Tweet'
import { connect } from '../database.utils'

export async function insertTweet (tweet: Tweet): Promise<string> {
  const mySqlConnection = await connect()
  const mySqlQuery = 'INSERT INTO tweet(tweetId, tweetProfileId, tweetContent, tweetDate ) VALUES(UUID_TO_BIN(UUID()), UUID_TO_BIN(:tweetProfileId), :tweetContent, NOW())'
  await mySqlConnection.execute(mySqlQuery, tweet)
  return 'Tweet created successfully'
}
