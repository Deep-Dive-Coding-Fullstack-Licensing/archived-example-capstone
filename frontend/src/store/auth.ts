import { AnyAction, createSlice } from '@reduxjs/toolkit'
import jwtDecode from "jwt-decode";
import { AppDispatch, RootState } from './store.ts'
import { Profile } from '../shared/interfaces/Profile.ts'


 export interface JwtToken extends Profile{
	exp: number,
	 iat: number
}

const initialState: JwtToken|null = null
const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		getAuth: (_, action) => {
			return action.payload
		}
	}
})

export const {getAuth} = slice.actions

export const fetchAuth = ()  => async (dispatch: AppDispatch, getState: RootState) => {
	const state = getState()

	if (state.auth === null) {
		const token = window.localStorage.getItem("authorization")
		let decodedToken = token ? jwtDecode<JwtToken>(token)  : null

		if(decodedToken) {
			if (decodedToken?.exp < Math.round( Date.now() / 1000)){
				decodedToken = null
			}
			dispatch(getAuth(decodedToken))

		}


	}

};

export default slice.reducer