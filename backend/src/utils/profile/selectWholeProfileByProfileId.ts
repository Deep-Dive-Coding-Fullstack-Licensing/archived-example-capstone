import {connect} from "../database.utils";
import {Profile} from "../interfaces/Profile";
import {RowDataPacket} from 'mysql2';

export async function selectWholeProfileByProfileId(profileId: string): Promise<Profile|null>  {
  try {
    const mysqlConnection = await connect();
    const sqlQuery: string = 'SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken,  profileAtHandle, profileAvatarUrl, profileEmail, profileHash,profilePhone FROM profile WHERE profileId = UUID_TO_BIN(:profileId)'
    const result = await mysqlConnection.execute(sqlQuery, {profileId}) as RowDataPacket[]
    const rows: Profile[]  = result[0] as Profile[]
    return rows.length === 1 ? {...rows[0]} : null;
  } catch (error) {
    throw error
  }
}
