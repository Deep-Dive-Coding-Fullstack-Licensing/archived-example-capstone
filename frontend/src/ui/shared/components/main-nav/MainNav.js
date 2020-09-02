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
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth} from "../../../../store/auth";


export const MainNav = (props) => {

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch()
	const effects = () => {
		dispatch(fetchAuth());
	};
	const inputs = [];
	useEffect(effects, inputs);

	const signOut = () => {
		httpConfig.get("/apis/sign-out/")
			.then(reply => {
				let {message, type} = reply;
				if(reply.status === 200) {
					window.localStorage.removeItem("authorization");
					window.location = "/";
					// setToHome(true);
					// dispatch(fetchAuth())
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
				{!auth && (
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