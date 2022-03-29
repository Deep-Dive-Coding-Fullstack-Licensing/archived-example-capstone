import { connect } from '../database.utils'
import { Like } from '../interfaces/Like'

export async function insertLike (like: Like): Promise<string> {
  const mySqlConnection = await connect()
  const mySqlQuery = 'INSERT INTO `like`(likeProfileId, likeTweetId, likeDate) VALUES(UUID_TO_BIN(:likeProfileId), UUID_TO_BIN(:likeTweetId), NOW())'
  await mySqlConnection.execute(mySqlQuery, like)
  await mySqlConnection.release()
  return 'Like successfully inserted'
}
