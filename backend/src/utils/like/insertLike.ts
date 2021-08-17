import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {Like} from "../interfaces/Like";

export async function insertLike(like: Like): Promise<string> {
	try {
		const mySqlConnection = await connect()
		const mySqlQuery = "INSERT INTO `like`(likeProfileId, likeTweetId, likeDate) VALUES(UUID_TO_BIN(:likeProfileId), UUID_TO_BIN(:likeTweetId), NOW())";
		await mySqlConnection.execute(mySqlQuery, like)
		return "Like successfully inserted"
	} catch(error) {
		throw error
	}
}
