import React from 'react'
import {useDispatch} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { httpConfig } from '../../utils/http-config.js'
import { getAuth } from '../../../store/auth.js'

export const SignOutComponent = () => {
	const dispatch = useDispatch()
	const signOut = () => {
		httpConfig.get('/apis/sign-out/').then(reply => {

			if (reply.status === 200) {
				window.localStorage.removeItem('authorization')
				dispatch(getAuth(null))
				window.location = '/'

			}
		})
	}

	return(
		<>
			<div className="dropdown-item sign-out-dropdown">
				<button className="btn btn-outline-dark" onClick={signOut}>
					Sign Out&nbsp;&nbsp;<FontAwesomeIcon icon="sign-out-alt" />
				</button>
			</div>
			</>
	)
}
