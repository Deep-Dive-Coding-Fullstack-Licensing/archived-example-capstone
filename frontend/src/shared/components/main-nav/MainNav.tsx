import {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {SignUpModal} from "./sign-up/SignUpModal.tsx";
import {SigninModal} from "./sign-in/SigninModal.tsx";
import {Container} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import { SignOutComponent } from './SignOut.tsx'
import { useJwtToken } from '../../hooks/useJwtHook.js'



export const MainNav = () => {

	const {profile } = useJwtToken()



	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// isModalOpen prevents the sign in modal being removed from the dom before the
	// sign-in modal is closed by the user
	const isModalOpen = ()=> {
		if(!profile) {
			return !profile
		} else if(show && profile  ) {
			return true
		}
	}

	return(
		<Navbar bg="primary" variant="dark">
			<Container>

				<Link className={"nav-link"} to="/">
					<Navbar.Brand>Tweeter</Navbar.Brand>

				</Link>
			<Nav className="mr-auto">

				{/* conditional render if user has jwt / is logged in */}
				{profile !== null && (
					<>
					<NavDropdown className="nav-link navbar-username" title={profile.profileAtHandle} >
						<div className="dropdown-item">
							<Link to={`/profile/${profile?.profileId}`} className="btn btn-outline-dark">
								<FontAwesomeIcon icon="user" />&nbsp;&nbsp;My Profile
							</Link>
						</div>
						<SignOutComponent />
					</NavDropdown>
					</>
					)}
				{isModalOpen()  &&  (
					<>
				<SignUpModal/>
				<SigninModal show={show} handleClose={handleClose} handleShow={handleShow}/>
				</>
					)}
			</Nav>
			</Container>
		</Navbar>
	)
};