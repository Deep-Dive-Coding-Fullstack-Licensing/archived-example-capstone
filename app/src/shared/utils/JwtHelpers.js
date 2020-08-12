import React, {useState, useEffect} from "react";
import * as jwtDecode from "jwt-decode";

/*
* Custom hooks to grab the jwt and decode jwt data for logged in users.
*
* Author: rlewis37@cnm.edu
* */

export const UseJwt = () => {
	const [jwt, setJwt] = useState(null);

	useEffect(() => {
		setJwt(window.localStorage.getItem("authorization"));
	}, [jwt]);

	return jwt;
};

export const UseJwtUsername = () => {
	const [username, setUsername] = useState(null);

	useEffect(() => {
		const token = window.localStorage.getItem("authorization");
		if(token !== null) {
			const decodedJwt = jwtDecode(token);
			setUsername(decodedJwt.profileAtHandle);
		}
	}, [username]);

	return username;
};

export const UseJwtProfileId = () => {
	const [profileId, setProfileId] = useState(null);

	useEffect(() => {
		const token = window.localStorage.getItem("authorization");
		if(token !== null) {
			const decodedJwt = jwtDecode(token);
			setProfileId(decodedJwt.profileId);
		}
	}, [profileId]);

	return profileId;
};




export const getToken = () => {
	let token = window.localStorage.getItem("authorization");
	const auth = token ? {
		'profileId': jwtDecode(token).profileId,
		'profileAtHandle': jwtDecode(token).profileAtHandle
	} : null
	return auth
}