import { Formik, FormikHelpers, FormikProps } from 'formik'
import {object, string} from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { DisplayStatus } from '../../display-status/DisplayStatus'
import { DisplayError } from '../../display-error/DisplayError'
import { SignIn } from '../../../interfaces/Profile.ts'
import { AppDispatch, useAppDispatch } from '../../../../store/store.ts'
import { ClientResponseForSignIn, usePostSignInMutation } from '../../../../store/apis.ts'
import { getAuth, JwtToken } from '../../../../store/auth.ts'
import jwtDecode from 'jwt-decode'



export const SignInForm = () => {
	const [submitRequest] = usePostSignInMutation()
	const dispatch: AppDispatch = useAppDispatch()

	const validator = object().shape({
		profileEmail: string()
			.email("please provide a valid email")
			.required('email is required'),
		profilePassword: string()
			.required("password is required")
			.min(8, "password must be at least eight characters")
	});


	//the initial values object defines what the request payload is.
	const signIn: SignIn = {
		profileEmail: "",
		profilePassword: ""
	};

	const submitSignIn = async (values: SignIn, formikHelpers: FormikHelpers<SignIn>) => {
		const {resetForm, setStatus} = formikHelpers
		const result = await submitRequest(values)
		const {data: response, error} = result as {data: ClientResponseForSignIn, error: ClientResponseForSignIn}
		if(error) {
			setStatus({type: error.type, message: error.message})
		}
		else if(response?.status === 200) {
			window.localStorage.removeItem("authorization");
			window.localStorage.setItem("authorization", response.authorization as string);
			const decodedToken = jwtDecode<JwtToken>(response.authorization as string)
			dispatch(getAuth(decodedToken))
			resetForm()
			setStatus({type: response.type, message: response.message})

		} else {
			setStatus({type: response?.type,  message: response?.message})
		}




	};

	return (
		<>
			<Formik
				initialValues={signIn}
				onSubmit={submitSignIn}
				validationSchema={validator}
			>
				{SignInFormContent}
			</Formik>
		</>
	)
};

function SignInFormContent(props: FormikProps<SignIn>) {
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
				<Form.Label>email</Form.Label>
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

				<FontAwesomeIcon icon="key"/>
				{/*controlId must match what is defined by the initialValues object*/}
				<Form.Group className="mb-1" controlId="profileAtHandle">
					<Form.Label>password</Form.Label>
						<InputGroup>
							<InputGroup.Text>
								<FontAwesomeIcon icon="key"/>
							</InputGroup.Text>
							<FormControl
								className="form-control"
								name="profilePassword"
								type="password"
								value={values.profilePassword}
								placeholder="p@ssword1"
								onChange={handleChange}
								onBlur={handleBlur}

							/>
						</InputGroup>
						<DisplayError errors={errors} touched={touched} field={"profilePassword"} />
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
			<div className="pt-3">
		<DisplayStatus status={status} />
				</div>
		</>
	)
}

