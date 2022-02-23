import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {ResultSetHeader, RowDataPacket} from 'mysql2';

export async function insertTweet(tweet: Tweet) : Promise<string> {
  try {
    const mySqlConnection = await connect()
    const mySqlQuery = "INSERT INTO tweet(tweetId, tweetProfileId, tweetContent, tweetDate ) VALUES(UUID_TO_BIN(UUID()), UUID_TO_BIN(:tweetProfileId))";

   const [result]= await mySqlConnection.execute(mySqlQuery, tweet) as [ResultSetHeader, RowDataPacket]
    return "Tweet created successfully"
  } catch (error) {
    throw error
}
}
