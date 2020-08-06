import {connect} from "../../src/database";
import {Profile} from "../interfaces/Profile";

export async function selectProfileByProfileActivationToken(profileActivationToken: string) {
	try {
		const mysqlConnection = await connect();
		
		const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(profileId) as profileId, profileActivationToken, profileAtHandle, profileAvatarUrl, profileEmail, profileHash, profilePhone FROM profile WHERE profileActivationToken = :profileActivationToken', {profileActivationToken});
		// @ts-ignore is required so that rows can be interacted with like the array it is
		return rows.length !== 0 ? {...rows[0]} : undefined;
		return rows
	} catch (e) {
		console.error(e)
		return undefined
	}
}