import tweets from "./tweets";
import auth from "./auth";
import profile from "./profile"
import likes from './likes'

import { configureStore,combineReducers} from '@reduxjs/toolkit'

const reducer = combineReducers({auth, likes, profile, tweets})
export default configureStore({reducer});