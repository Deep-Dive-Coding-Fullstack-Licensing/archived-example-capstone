import {connect} from "../../src/database";
import {Profile} from "../interfaces/Profile";

export async function insertProfile(profile: Profile) {
	try {
		const mysqlConnection = await connect();
		const query : string = 'INSERT INTO profile(profileId, profileActivationToken, profileAtHandle, profileAvatarUrl,  profileEmail, profileHash, profilePhone ) VALUES (UUID_TO_BIN(UUID()) , :profileActivationToken, :profileAtHandle, :profileAvatarUrl, :profileEmail, :profileHash, :profilePhone)';
		
		const [rows] = await mysqlConnection.execute(query, profile);
		return 'Profile Successfully Created'
	} catch (e) {
		console.error(e)
		return null
	}
}