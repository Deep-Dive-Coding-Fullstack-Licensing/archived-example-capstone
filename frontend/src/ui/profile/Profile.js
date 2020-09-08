import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileForm } from './EditProfileForm'
import { fetchProfileByProfileId } from '../../store/profile'
export const Profile = () => {
	const dispatch = useDispatch()
	const profile = useSelector(state => {return state.profile ? state.profile : null})
	console.log(profile)
	const sideEffects = () => {
		dispatch(fetchProfileByProfileId())
	}

	React.useEffect(sideEffects, [])






	return(
		<>
			{profile && <EditProfileForm profile={profile}/>}
		</>
	)
};