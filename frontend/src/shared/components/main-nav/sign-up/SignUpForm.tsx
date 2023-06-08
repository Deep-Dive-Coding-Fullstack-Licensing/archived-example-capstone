
import {string, object} from "yup";
import {Formik, FormikHelpers, FormikProps} from "formik";
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { DisplayError } from '../../display-error/DisplayError'
import { DisplayStatus } from '../../display-status/DisplayStatus'
import {ClientResponseForSignIn, MutationResponse, usePostSignUpMutation} from "../../../../store/apis.ts";
import {SignUp} from "../../../interfaces/Profile.ts";

export const SignUpForm = () => {
	const signUp: SignUp = {
		profileEmail: "",
		profileAtHandle: "",
		profilePassword: "",
		profilePasswordConfirm: "",
		profilePhone: "",
		profileAvatarUrl: null,
	};

	const [submitRequest] = usePostSignUpMutation();

	const validator = object().shape({
		profileEmail: string()
			.email("email must be a valid email")
			.required('email is required'),
		profileAtHandle: string()
			.required("profile handle is required"),
		profilePassword: string()
			.required("Password is required")
			.min(8, "Password must be at least eight characters"),
		profilePasswordConfirm: string()
			.required("Password Confirm is required")
			.min(8, "Password must be at least eight characters"),
		profilePhone: string()
			.min(10, "phone number is to short")
			.max(10, "phone Number is to long")
	});

	const submitSignUp =  async (values: SignUp, formikHelpers: FormikHelpers<SignUp>) => {
		const {resetForm, setStatus} = formikHelpers;

		const result = await submitRequest(values) as MutationResponse
		const {
			data: response, error} = result as {data: ClientResponseForSignIn, error: ClientResponseForSignIn}
		if(error) {
			setStatus({type: error.type, message: error.message})
		}
		else if(response?.status === 200) {
			resetForm()
			setStatus({type: response.type, message: response.message})

		} else {
			setStatus({type: response?.type,  message: response?.message})
		}
	};


	return (

		<Formik
			initialValues={signUp}
			onSubmit={submitSignUp}
			validationSchema={validator}
		>
			{SignUpFormContent}
		</Formik>

	)
};
function  SignUpFormContent(props: FormikProps<SignUp>){
	const {
		status,
		values,
		errors,
		touched,
		dirty,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
		handleReset
	} = props;
	return (
		<>
			<Form onSubmit={handleSubmit}>
				{/*controlId must match what is passed to the initialValues prop*/}
				<Form.Group className="mb-1" controlId="profileEmail">
					<Form.Label>Email</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="envelope"/>
						</InputGroup.Text>
						<FormControl
							className="form-control"
							name="profileEmail"
							type="text"
							value={values.profileEmail}
							placeholder="your@email.you"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</InputGroup>
					<DisplayError errors={errors} touched={touched} field={"profileEmail"} />
					</Form.Group>
				{/*controlId must match what is defined by the initialValues object*/}
				<Form.Group className="mb-1" controlId="profilePassword">
					<Form.Label>Password</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="key"/>
						</InputGroup.Text>
						<FormControl
							className="form-control"
							name="profilePassword"
							type="password"
							value={values.profilePassword}
							placeholder="P@ssword1"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</InputGroup>
					<DisplayError errors={errors} touched={touched} field={"profilePassword"} />
				</Form.Group>
				<Form.Group className="mb-1" controlId="profilePasswordConfirm">
					<Form.Label>Confirm Password</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="key"/>
						</InputGroup.Text>
						<FormControl
							className="form-control"
							name="profilePasswordConfirm"
							type="password"
							value={values.profilePasswordConfirm}
							placeholder="placeholder-placeholder"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</InputGroup>
					<DisplayError errors={errors} touched={touched} field={"profilePasswordConfirm"} />
				</Form.Group>

				<Form.Group className="mb-1" controlId="profileAtHandle">
					<Form.Label>ProfileHandle</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="dove"/>
						</InputGroup.Text>
						<FormControl
							className="form-control"
							name="profileAtHandle"
							type="text"
							value={values.profileAtHandle}
							placeholder="yourHandle"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</InputGroup>
					<DisplayError errors={errors} touched={touched} field={"profileAtHandle"} />
				</Form.Group>
				<Form.Group className="mb-1" controlId="profilePhone">
					<Form.Label>Phone Number</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="phone"/>
						</InputGroup.Text>
						<FormControl
							className="form-control"
							name="profilePhone"
							type="text"
							value={values.profilePhone}
							placeholder="placeholder-placeholder"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</InputGroup>
					<DisplayError errors={errors} touched={touched} field={"profilePhone"} />
				</Form.Group>
				<Form.Group className={"mt-3"}>
					<Button className="btn btn-primary" type="submit">Submit</Button>
					{" "}
					<Button
						className="btn btn-danger"
						onClick={handleReset}
						disabled={!dirty || isSubmitting}
					>Reset
					</Button>
				</Form.Group>


			</Form>
			<DisplayStatus status={status} />

		</>


	)
}

