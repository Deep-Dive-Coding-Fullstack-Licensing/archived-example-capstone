import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";

export async function selectTweetsByTweetProfileId(tweetProfileId: string) {
	const mySqlConnection = await connect();
	const mySqlQuery = 'SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate from tweet

	return rows;
}
