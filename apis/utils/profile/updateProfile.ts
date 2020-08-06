
import {Profile} from "../interfaces/Profile";
import {connect} from "../../src/database";

export async function updateProfile(profile: Profile) {
	try {
		
		const mysqlConnection = await connect();
		const query : string = 'UPDATE profile SET profileActivationToken = :profileActivationToken, profileAtHandle = :profileAtHandle, profileAvatarUrl = :profileAvatarUrl,profileEmail = :profileEmail, profileHash = :profileHash, profilePhone = :profilePhone WHERE profileId = UUID_TO_BIN(:profileId)';
		
		const [rows] = await mysqlConnection.execute(query, profile);
		return 'Profile successfully updated'
	} catch (e) {
		console.error(e)
		return null
	}
}