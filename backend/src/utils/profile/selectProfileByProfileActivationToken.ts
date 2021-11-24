import {connect} from "../database.utils";
import {Profile} from "../interfaces/Profile";
import {RowDataPacket} from 'mysql2';
import {Tweet} from '../interfaces/Tweet';

export async function selectProfileByProfileActivationToken(profileActivationToken: string): Promise<Profile|null> {
	try {
		console.log(profileActivationToken)
		const mysqlConnection = await connect();
		const mysqlQuery: string = "SELECT BIN_TO_UUID(profileId) as profileId,  profileAtHandle, profileAvatarUrl, profileEmail, profilePhone FROM profile WHERE profileActivationToken = :profileActivationToken"
		const result = await mysqlConnection.execute(mysqlQuery ,{profileActivationToken}) as RowDataPacket[]
		const rows: Profile[]  = result[0] as Profile[]
		return rows.length === 1 ? {...rows[0]} : null;
	}  catch (error) {
		throw error
	}
}