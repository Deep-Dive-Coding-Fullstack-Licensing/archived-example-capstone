import React, {useState, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap"
import {SignUpModal} from "./sign-up/SignUpModal";
import {SignInModal} from "./sign-in/SigninModal";
import {Container} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import {httpConfig} from "../../utils/http-config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {getAuth} from "../../actions/auth";
import {useDispatch, useSelector} from "react-redux";


export const MainNav = (props) => {

	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth);
	const effects = () => {
		dispatch(getAuth());
	};
	const inputs = [];
	useEffect(effects, inputs);

	const signOut = () => {
		httpConfig.get("/apis/sign-out/")
			.then(reply => {
				let {message, type} = reply;
				if(reply.status === 200) {
					window.localStorage.removeItem("authorization");
					console.log(reply);
					window.location = "/";
					// setToHome(true);
					dispatch(getAuth())
				}
			});
	};


	return(
		<Navbar bg="primary" variant="dark">
			<Container>
			<LinkContainer exact to="/" >
				<Navbar.Brand>Tweeter</Navbar.Brand>
			</LinkContainer>
			<Nav className="mr-auto">

				{/* conditional render if user has jwt / is logged in */}
				{auth !== null && (
					<>
					<NavDropdown className="nav-link navbar-username" title={auth?.profileAtHandle ?? ""} >
						<div className="dropdown-item">
							<Link to={`/profile/${auth?.profileId}`} className="nav-link">
								<FontAwesomeIcon icon="user" />&nbsp;&nbsp;My Profile
							</Link>
						</div>
						<div className="dropdown-divider"></div>
						<div className="dropdown-item sign-out-dropdown">
							<button className="btn btn-outline-dark" onClick={signOut}>
								Sign Out&nbsp;&nbsp;<FontAwesomeIcon icon="sign-out-alt" />
							</button>
						</div>
					</NavDropdown>
				<LinkContainer exact to="/image">
					<Nav.Link>Image</Nav.Link>
				</LinkContainer>
					</>
					)}
				{auth === null && (
					<>
				<SignUpModal/>
				<SignInModal/>
				</>
					)}
			</Nav>
			</Container>
		</Navbar>
	)
};