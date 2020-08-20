import {Request, Response} from 'express';

// DB

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import {Status} from '../../utils/interfaces/Status';
import {Profile} from "../../utils/interfaces/Profile";
import {Like} from "../../utils/interfaces/Like";
import {selectLike} from "../../utils/like/selectLike";
import {deleteLike} from "../../utils/like/deleteLike";
import {insertLike} from "../../utils/like/insertLike";

const {validationResult} = require('express-validator');

export async function toggleLike(request: Request, response: Response) {

	try {
		validationResult(request).throw();

		const {likeTweetId} = request.body;
		const profile: Profile = request.session?.profile
		const likeProfileId = <string>profile.profileId

		const like: Like = {
			likeProfileId,
			likeTweetId,
			likeDate: null,
		}
		const select = await selectLike(like)
		// @ts-ignore
		if (select[0]){
			const result = await deleteLike(like)
		}else{
			const result = await insertLike(like)
		}

		const status: Status = {
			status: 200,
			message: 'Like successfully updated',
			data: null
		};
		return response.json(status);

	} catch(error) {
		console.log(error);
	}
}
