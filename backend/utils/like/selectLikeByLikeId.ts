import {Tweet} from "../interfaces/Tweet";
import {connect} from "../../src/database";
import {Like} from "../interfaces/Like";

export async function selectLikeByLikeId(like: Like) {
	try {
		const mysqlConnection = await connect();
		const mySqlSelectQuery = 'SELECT BIN_TO_UUID(likeProfileId) as likeProfileId, BIN_TO_UUID(likeTweetId) as likeTweetId, likeDate FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId)'
		const [rows] = await mysqlConnection.execute(mySqlSelectQuery, like)
		return rows;

	} catch(error) {
		console.log(error)
	}
}
