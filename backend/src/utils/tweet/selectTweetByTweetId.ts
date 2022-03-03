import { Tweet } from '../interfaces/Tweet'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectTweetByTweetId (tweetId: string): Promise<Tweet|null> {
  const mySqlConnection = await connect()
  const mySqlQuery = 'SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate from tweet WHERE tweetId = UUID_TO_BIN(:tweetId)'
  const result = await mySqlConnection.execute(mySqlQuery, { tweetId }) as RowDataPacket[]
  const tweets: Tweet[] = result[0] as Tweet[]
  return tweets.length === 1 ? { ...tweets[0] } : null
}
