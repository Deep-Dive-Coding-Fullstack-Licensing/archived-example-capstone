import {combineReducers} from "redux"
import tweets from "./tweets";
import auth from "./auth";
import profile from "./profile"

export default combineReducers({tweets, auth,profile})