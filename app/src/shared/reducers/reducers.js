import {combineReducers} from "redux"
import tweetReducer from "./tweetReducer";
import authReducer from "./authReducer";

export const combinedReducers = combineReducers({
	tweets: tweetReducer,
	auth: authReducer,
});