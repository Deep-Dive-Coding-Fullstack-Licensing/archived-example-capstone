import { createSlice } from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/httpConfig";
import { fetchLikesByLikeTweetId } from './likes'

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

export const fetchAllTweets = () => async (dispatch, getState) => {
	const {data} =  await httpConfig.get("/apis/tweet/");
	dispatch(setAllTweets(data));
	for(let tweet of data){
			dispatch(fetchLikesByLikeTweetId(tweet.tweetId))
	}
};

export default slice.reducer