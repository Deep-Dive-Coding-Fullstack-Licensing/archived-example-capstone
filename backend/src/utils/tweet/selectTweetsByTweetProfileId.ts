import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {RowDataPacket} from 'mysql2';

export async function selectTweetsByTweetProfileId(tweetProfileId: string) : Promise<Tweet[]> {
	try {
		const mySqlConnection = await connect();
		const mySqlQuery = 'SELECT BIN_TO_UUID(tweetId) AS tweetId, BIN_TO_UUID (tweetProfileId) AS tweetProfileId, tweetContent, tweetDate, profile.profileAtHandle, profile.profileAvatarUrl, (SELECT COUNT(*) FROM `like` WHERE tweet.tweetId = like.likeTweetId) AS likeCount FROM tweet INNER JOIN profile ON profile.profileId = tweet.tweetProfileId WHERE tweetProfileId = UUID_TO_BIN(:tweetProfileId) ORDER BY tweetDate DESC'
		const result = await <RowDataPacket>mySqlConnection.execute(mySqlQuery, {tweetProfileId})
		return result[0] as Tweet[]
	} catch (error) {
		throw error
	}
}

