import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileForm } from './EditProfileForm'
import { fetchCurrentUser } from '../../store/currentUser'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
export const Profile = () => {

	const dispatch = useDispatch()
	const profile = useSelector(state => {return state.currentUser ? state.currentUser : null})

	const sideEffects = () => {
		dispatch(fetchCurrentUser())
	}

	React.useEffect(sideEffects, [dispatch])
	return(
		<>
			<Container className='p-5'>
				<Row>
					<Col>
						{profile &&
							<>
							<EditProfileForm profile={profile}/>
						</>
						}
					</Col>

				</Row>
			</Container>
		</>
	)
};