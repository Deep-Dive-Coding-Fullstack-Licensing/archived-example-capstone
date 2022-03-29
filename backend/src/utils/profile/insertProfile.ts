import { connect } from '../database.utils'
import { Profile } from '../interfaces/Profile'

export async function insertProfile (profile: Profile): Promise<string> {
  const mysqlConnection = await connect()
  const query: string = 'INSERT INTO profile(profileId, profileActivationToken, profileAtHandle, profileAvatarUrl,  profileEmail, profileHash, profilePhone ) VALUES (UUID_TO_BIN(UUID()) , :profileActivationToken, :profileAtHandle, :profileAvatarUrl, :profileEmail, :profileHash, :profilePhone)'
  await mysqlConnection.execute(query, profile)
  await mysqlConnection.release()
  return 'Profile Successfully Created'
}
