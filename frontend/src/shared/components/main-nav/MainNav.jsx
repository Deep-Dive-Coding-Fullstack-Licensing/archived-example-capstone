import React, {useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap"
import {SignUpModal} from "./sign-up/SignUpModal.jsx";
import {SigninModal} from "./sign-in/SigninModal.jsx";
import {Container} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { SignOutComponent } from './SignOut.jsx'
import { fetchAuth } from '../../../store/auth.ts'


export const MainNav = () => {

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch()
	const effects = () => {
    dispatch(fetchAuth());
	};
	useEffect(effects, [dispatch]);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// isModalOpen prevents the sign in modal being removed from the dom before the
	// sign-in modal is closed by the user
	const isModalOpen = ()=> {
		if(!auth) {
			return !auth
		} else if(show === true && auth  ) {
			return true
		}
	}

	return(
		<Navbar bg="primary" variant="dark">
			<Container>
			<LinkContainer to="/" >
				<Navbar.Brand>Tweeter</Navbar.Brand>
			</LinkContainer>
			<Nav className="mr-auto">

				{/* conditional render if user has jwt / is logged in */}
				{auth !== null && (
					<>
					<NavDropdown className="nav-link navbar-username" title={auth?.profileAtHandle ?? ""} >
						<div className="dropdown-item">
							<Link to={`/profile/${auth?.profileId}`} className="btn btn-outline-dark">
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