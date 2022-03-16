import { connect } from '../database.utils'
import { Like } from '../interfaces/Like'

export async function deleteLike (like: Like): Promise<string> {
  const mySqlConnection = await connect()
  const mySqlDelete = 'DELETE FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId)'
  await mySqlConnection.execute(mySqlDelete, like)
  await mySqlConnection.release()
  return 'Like successfully deleted'
}
