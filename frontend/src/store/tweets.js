import { createSlice } from "@reduxjs/toolkit";
import {httpConfig} from "../ui/shared/utils/http-config";

const slice = createSlice({
	name: "tweets",
	initialState: [],
	reducers: {
		getAllTweets: (tweets, action) => {
			return action.payload
		}
	}
})

export const {getAllTweets} = slice.actions

export const fetchAllTweets = () => async (dispatch) => {
	const {data} =  await httpConfig.get("/apis/tweet/");
	dispatch(getAllTweets(data));
};

export default slice.reducer