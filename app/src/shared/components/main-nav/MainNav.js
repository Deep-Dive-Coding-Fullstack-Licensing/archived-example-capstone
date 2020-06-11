import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap"
import {SignUpModal} from "./sign-up/SignUpModal";
import {SignInModal} from "./sign-in/SigninModal";



export const MainNav = (props) => {
	return(
		<Navbar bg="primary" variant="dark">
			<LinkContainer exact to="/" >
				<Navbar.Brand>Navbar</Navbar.Brand>
			</LinkContainer>
			<Nav className="mr-auto">
				<LinkContainer exact to="/profile">
					<Nav.Link>Profile</Nav.Link>
				</LinkContainer>
				<LinkContainer exact to="/image">
					<Nav.Link>Image</Nav.Link>
				</LinkContainer>
				<SignUpModal/>
				<SignInModal/>
			</Nav>
		</Navbar>
	)
};