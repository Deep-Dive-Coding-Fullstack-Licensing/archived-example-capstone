
import { Profile } from '../interfaces/Profile'
import { connect } from '../database.utils'

export async function updateProfile (profile: Profile): Promise<string> {
  const mysqlConnection = await connect()
  const query: string = 'UPDATE profile SET profileActivationToken = :profileActivationToken, profileAtHandle = :profileAtHandle, profileAvatarUrl = :profileAvatarUrl, profileEmail = :profileEmail,  profilePhone = :profilePhone WHERE profileId = UUID_TO_BIN(:profileId)'
  await mysqlConnection.execute(query, profile)
  return 'Profile successfully updated'
}
