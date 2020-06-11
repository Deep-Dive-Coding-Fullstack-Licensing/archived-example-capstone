import { connect } from '../database';
import {Profile} from "../interfaces/Profile";

export async function getProfileByProfileEmail (profileEmail: string) : Promise<Profile|undefined> {

    const mysqlConnection = await connect();

    const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileAtHandle, profileAvatarUrl, profileEmail, profileHash, profilePhone FROM profile WHERE profileEmail = :profileEmail', { profileEmail});

    // @ts-ignore is required so that rows can be interacted with like the array it is
  return rows.length !== 0 ? {...rows[0]} : undefined;
}
