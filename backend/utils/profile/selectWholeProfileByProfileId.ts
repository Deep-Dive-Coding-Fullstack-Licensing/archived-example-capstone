import {connect} from "../../src/database";
import {Profile} from "../interfaces/Profile";

export async function selectWholeProfileByProfileId(profileId: string) {
  try {
    const mysqlConnection = await connect();

    const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken,  profileAtHandle, profileAvatarUrl, profileEmail, profileHash,profilePhone FROM profile WHERE profileId = UUID_TO_BIN(:profileId)', {profileId});

    // @ts-ignore is required so that rows can be interacted with like the array it is
    return rows.length !== 0 ? {...rows[0]} : undefined;
  } catch (e) {
    console.error(e)
    return undefined
  }
}
