
import {useDispatch} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { httpConfig } from '../../utils/http-config.js'
import { getAuth } from '../../../store/auth.ts'
import { AppDispatch } from '../../../store/store.ts'
import { ServerResponse } from '../../../store/apis.ts'
import { AxiosResponse } from 'axios'

export const SignOutComponent = () => {
	const dispatch: AppDispatch = useDispatch()
	const signOut = () => {
		httpConfig.get('/apis/sign-out/').then((reply:AxiosResponse<ServerResponse>) => {

			if (reply.status === 200) {
				window.localStorage.removeItem('authorization')
				dispatch(getAuth(null))
				window.location.href = "/"

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
