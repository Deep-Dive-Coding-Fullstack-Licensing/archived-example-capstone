import {combineReducers} from "redux"
import tweets from "./tweets";
import auth from "./auth";

export default combineReducers({tweets, auth})