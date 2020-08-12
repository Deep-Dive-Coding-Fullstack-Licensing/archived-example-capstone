import * as jwtDecode from "jwt-decode";
import {getToken} from "../utils/JwtHelpers";

export const getAuth  = () => async (dispatch) => {
	const auth = getToken()
	// let token = window.localStorage.getItem("authorization");
	// console.log('authorization',token)
	// const auth = token ? {
	// 	'profileId': jwtDecode(token).profileId,
	// 	'profileAtHandle': jwtDecode(token).profileAtHandle
	// } : ""
	dispatch({type: "GET_AUTH", payload: auth});
};