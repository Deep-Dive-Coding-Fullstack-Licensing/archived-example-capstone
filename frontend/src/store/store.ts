// @ts-ignore
import tweets from "./tweets";
import auth from "./auth";
// @ts-ignore
import currentUser from "./currentUser"
// @ts-ignore
import likes from './likes'
// @ts-ignore
import profiles from "./profiles"

import { configureStore,combineReducers} from '@reduxjs/toolkit'
import { apis } from './apis'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const reducer = combineReducers({auth, likes, currentUser, tweets, profiles, api: apis.reducer})
export const store: ToolkitStore =configureStore({reducer});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//useAppDispatch and useAppSelector are custom hooks that allow us to use redux in our components
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
