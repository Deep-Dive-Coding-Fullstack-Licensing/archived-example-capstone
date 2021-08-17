import {Tweet} from "../interfaces/Tweet";
import {connect} from "../database.utils";
import {Like} from "../interfaces/Like";
import {RowDataPacket} from 'mysql2';

export async function selectLikeByLikeId(like: Like): Promise<Like|null> {
	try {
		const mysqlConnection = await connect();
		const mySqlSelectQuery = 'SELECT BIN_TO_UUID(likeProfileId) as likeProfileId, BIN_TO_UUID(likeTweetId) as likeTweetId, likeDate FROM `like` WHERE likeProfileId = UUID_TO_BIN(:likeProfileId) AND likeTweetId = UUID_TO_BIN(:likeTweetId)'
		const result : RowDataPacket[]= await mysqlConnection.execute(mySqlSelectQuery, like) as RowDataPacket[]
		const rows: Like[] = result[0] as Like[]
		return rows.length !== 0 ? {...rows[0]} : null;
	} catch(error) {
		throw error
	}
}
