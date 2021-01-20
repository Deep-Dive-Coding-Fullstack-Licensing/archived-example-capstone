import { createSlice } from '@reduxjs/toolkit'
import { fetchAuth } from './auth'
import { httpConfig } from '../ui/shared/utils/http-config'

const profileSlice = createSlice({
	name: "profile",
	initialState: null,
	reducers: {
		getProfileByProfileId: (profile, action) => {
			return action.payload
		}
	}
})

export const {getProfileByProfileId} = profileSlice.actions

export default profileSlice.reducer

export const fetchProfileByProfileId = () => async (dispatch, getState) => {
	await dispatch(fetchAuth())
	const {auth} = getState()
	console.log(auth)
	if(auth !== null) {
		const {data} = await httpConfig.get(`/apis/profile/${auth.profileId}`)
		console.log(data)
		dispatch(getProfileByProfileId(data))
	}
}


