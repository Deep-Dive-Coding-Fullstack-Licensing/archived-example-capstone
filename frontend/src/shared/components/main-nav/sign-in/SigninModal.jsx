import React from "react";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {SignInForm} from "./SignInForm.jsx";


export const SigninModal = (props) => {
	const {handleShow, handleClose, show} = props


	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Sign In
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sign In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SignInForm/>
				</Modal.Body>
			</Modal>
		</>
	);
}