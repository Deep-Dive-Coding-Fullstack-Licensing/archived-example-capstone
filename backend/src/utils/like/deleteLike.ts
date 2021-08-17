import {connect} from "../database.utils";
import {Like} from "../interfaces/Like";

export async function deleteLike(like: Like) {
	try {
		const mySqlConnection = await connect()
		const mySqlDelete = 'DELETE FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId)'
		const [result] = await mySqlConnection.execute(mySqlDelete, like)
		return "Like successfully deleted"
	} catch(error) {
		throw error
	}
}
