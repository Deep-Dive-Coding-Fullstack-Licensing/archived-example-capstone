import tweets from "./tweets";
import auth from "./auth";
import currentUser from "./currentUser"
import likes from './likes'
import profiles from "./profiles"

import { configureStore,combineReducers} from '@reduxjs/toolkit'

const reducer = combineReducers({auth, likes, currentUser, tweets, profiles})
export default configureStore({reducer});