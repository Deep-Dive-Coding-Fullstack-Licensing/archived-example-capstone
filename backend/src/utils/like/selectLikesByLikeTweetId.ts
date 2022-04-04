import { connect } from '../database.utils'
import { Like } from '../interfaces/Like'
import { RowDataPacket } from 'mysql2'

export async function selectLikesByLikeTweetId (likeTweetId: string): Promise<Like[]> {
  const mysqlConnection = await connect()
  const mySqlSelectQuery = 'SELECT BIN_TO_UUID(likeProfileId) as likeProfileId, BIN_TO_UUID(likeTweetId) as likeTweetId, likeDate FROM `like` WHERE likeTweetId = UUID_TO_BIN(:likeTweetId)'
  const result: RowDataPacket[] = await mysqlConnection.execute(mySqlSelectQuery, { likeTweetId }) as RowDataPacket[]
  await mysqlConnection.release()
  return result[0] as Like[]
}
