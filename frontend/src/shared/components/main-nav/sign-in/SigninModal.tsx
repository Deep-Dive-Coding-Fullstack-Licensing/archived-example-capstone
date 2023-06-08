
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {SignInForm} from "./SignInForm.tsx";

export interface SignInModalProps {
	handleShow: () => void,
	handleClose: () => void,
	show: boolean
}

export const SigninModal = (props: SignInModalProps) => {
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