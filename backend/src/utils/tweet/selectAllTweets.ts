import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {Profile} from "../interfaces/Profile";
import {Status} from "../interfaces/Status";
import {RowDataPacket,} from "mysql2"

export async function selectAllTweets() : Promise<Tweet[]> {
	try {
		const mySqlConnection = await connect()
		const mySqlQuery = 'SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate, profile.profileAtHandle, profile.profileAvatarUrl, (SELECT COUNT(*) FROM `like` WHERE tweet.tweetId = like.likeTweetId) AS likeCount FROM tweet INNER JOIN profile ON profile.profileId = tweet.tweetProfileId ORDER BY tweetDate DESC'
		const result = await mySqlConnection.execute(mySqlQuery) as RowDataPacket[]
		return result[0] as Array<Tweet>
	} catch (error) {
		throw error
	}
}