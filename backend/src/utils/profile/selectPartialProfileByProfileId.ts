import {connect} from "../database.utils";
import {PartialProfile, Profile} from '../interfaces/Profile';
import {RowDataPacket} from 'mysql2';
import {Tweet} from '../interfaces/Tweet';

export async function selectPartialProfileByProfileId(profileId: string) : Promise<PartialProfile|null> {
  try {
    const mysqlConnection = await connect();
    const mysqlQuery : string = "SELECT BIN_TO_UUID(profileId) as profileId,  profileAtHandle, profileAvatarUrl, profileEmail, profilePhone FROM profile WHERE profileId = UUID_TO_BIN(:profileId)"
    const result: RowDataPacket[] = await mysqlConnection.execute(mysqlQuery, {profileId}) as RowDataPacket[]
    const rows: PartialProfile[] = result[0] as PartialProfile[]
    return rows.length !== 0 ? {...rows[0]} : null;
  } catch (error) {
    throw error
  }
}
