import { Tweet } from '../interfaces/Tweet'
import { connect } from '../database.utils'
import { RowDataPacket } from 'mysql2'

export async function selectAllTweets (): Promise<Tweet[]> {
  const mySqlConnection = await connect()
  const mySqlQuery = 'SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate FROM tweet ORDER BY tweetDate DESC'
  const result = await mySqlConnection.execute(mySqlQuery) as RowDataPacket[]
  await mySqlConnection.release()
  return result[0] as Tweet[]
}