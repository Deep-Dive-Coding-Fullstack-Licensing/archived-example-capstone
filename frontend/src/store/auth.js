import { createSlice } from "@reduxjs/toolkit";
import * as jwtDecode from "jwt-decode";


const slice = createSlice({
	name: "auth",
	initialState: null,
	reducers: {
		getAuth: (auth, action) => {
			return action.payload
		}
	}
})

export const {getAuth} = slice.actions

export const fetchAuth = () => async (dispatch, getState) => {
	const state = getState()

	if (state.auth === null) {
		const token = window.localStorage.getItem("authorization")
		let decodedToken = token ? jwtDecode(token) : null
		if (decodedToken?.exp < Math.round( new Date() / 1000)){
			decodedToken = null
		}
		dispatch(getAuth(decodedToken))
	}

};

export default slice.reducer