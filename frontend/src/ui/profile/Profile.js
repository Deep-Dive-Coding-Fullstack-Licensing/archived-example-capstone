import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileForm } from './EditProfileForm'
import { fetchProfileByProfileId } from '../../store/profile'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export const Profile = () => {

	const dispatch = useDispatch()
	const profile = useSelector(state => {return state.profile ? state.profile : null})

	const sideEffects = () => {
		dispatch(fetchProfileByProfileId())
	}

	React.useEffect(sideEffects, [])
	return(
		<>
			<Container>
				<Row>
					<Col>
						{profile && <EditProfileForm profile={profile}/>}
					</Col>

				</Row>
			</Container>
		</>
	)
};