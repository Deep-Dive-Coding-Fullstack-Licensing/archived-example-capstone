import {Tweet} from "../interfaces/Tweet";
import {connect} from "../../src/database";
import {Profile} from "../../src/interfaces/Profile";
import {Status} from "../../src/interfaces/Status";

export async function selectAllTweets() {
	try {
		const mySqlConnection = await connect()
		const mySqlQuery = 'SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate, profile.profileAtHandle, profile.profileAvatarUrl, (SELECT COUNT(*) FROM `like` WHERE tweet.tweetId = like.likeTweetId) AS likeCount FROM tweet INNER JOIN profile ON profile.profileId = tweet.tweetProfileId ORDER BY tweetDate DESC';
		const [rows] = await mySqlConnection.execute(mySqlQuery)
		return rows;
	} catch (error) {
		console.log(error)
	}
}