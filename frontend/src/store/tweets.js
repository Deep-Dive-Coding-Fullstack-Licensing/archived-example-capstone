import { createSlice } from "@reduxjs/toolkit";
import { fetchLikesByLikeTweetId } from './likes'
import { fetchProfileByProfileId } from './profiles'
import { httpConfig } from '../shared/utils/http-config.ts'

const slice = createSlice({
	name: "tweets",
	initialState: [],
	reducers: {
		setAllTweets: (tweets, action) => {
			return action.payload
		}
	}
})

export const {setAllTweets} = slice.actions

export const fetchAllTweets = () => async (dispatch) => {
	const {data} =  await httpConfig.get("/apis/tweet/");
	dispatch(setAllTweets(data));
	let profileIdSet = new Set
	for(let tweet of data){
		const {tweetId, tweetProfileId} = tweet
		if(profileIdSet.has(tweetProfileId) === false) {
			profileIdSet.add(tweetProfileId)
			dispatch(fetchProfileByProfileId(tweetProfileId))
		}
		dispatch(fetchLikesByLikeTweetId(tweetId))

	}


};

export default slice.reducer