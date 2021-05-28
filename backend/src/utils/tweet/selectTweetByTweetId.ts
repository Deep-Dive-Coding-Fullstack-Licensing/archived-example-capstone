import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {RowDataPacket} from 'mysql2';

export async function selectTweetByTweetId(tweetId: string) : Promise<Tweet|null> {
try {
	const mySqlConnection = await connect();
	const mySqlQuery = "SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate from tweet WHERE tweetId = UUID_TO_BIN(:tweetId)"
	const result = await <RowDataPacket>mySqlConnection.execute(mySqlQuery, {tweetId})
	await mySqlConnection.release()
	const rows : Array<Tweet> = result[0]
	console.log(rows.length)
	return rows.length === 1 ? {...rows[0]} : null;
} catch (error) {
	throw error
}
}
