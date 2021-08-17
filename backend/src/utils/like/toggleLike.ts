import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {Like} from "../interfaces/Like";

//TODO REWRITE this whole thing
export async function toggleLike(like: Like) : Promise<string> {
	try {
		console.log('like', like)
		const mysqlConnection = await connect();
		const mySqlSelectQuery = 'SELECT BIN_TO_UUID(likeProfileId) as likeProfileId, BIN_TO_UUID(likeTweetId) as likeTweetId, likeDate FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId)'
		// const mySqlSelectQuery = 'SELECT EXISTS (SELECT * FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId))'
		// const mySqlSelectQuery = 'SELECT COUNT(*) FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId))'

		const [likeRows] = await mysqlConnection.execute(mySqlSelectQuery, like)
		// @ts-ignore
		console.log('likeRows', likeRows)
		// @ts-ignore
		if (likeRows[0]){

			const mySqlConnection = await connect()
			const mySqlDelete = 'DELETE FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId)'
			const [deleteRows] = await mySqlConnection.execute(mySqlDelete, like)
			console.log('REMOVED LIKE')



		}else{

			const mySqlConnection = await connect()
			const mySqlQuery = "INSERT INTO `like`(likeProfileId, likeTweetId, likeDate) VALUES(UUID_TO_BIN(:likeProfileId), UUID_TO_BIN(:likeTweetId), NOW())";

			const [rows] = await mySqlConnection.execute(mySqlQuery, like)
			console.log('ADDED LIKE')

		}


		return "Like toggled successfully"
	} catch (error) {
		throw error
	}
}
