import {Tweet} from "../interfaces/Tweet";
import {connect} from "../../src/database";
import {Like} from "../interfaces/Like";

export async function insertLike(like: Like) {
	try {
		const mySqlConnection = await connect()
		const mySqlQuery = "INSERT INTO `like`(likeProfileId, likeTweetId, likeDate) VALUES(UUID_TO_BIN(:likeProfileId), UUID_TO_BIN(:likeTweetId), NOW())";
		const [rows] = await mySqlConnection.execute(mySqlQuery, like)
		return "Like successfully inserted"
	} catch(error) {
		console.log(error)
	}
}
