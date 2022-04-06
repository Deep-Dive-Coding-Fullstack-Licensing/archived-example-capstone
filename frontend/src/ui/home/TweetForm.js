import React from 'react';
import {httpConfig} from "../shared/utils/httpConfig";
import * as Yup from "yup";
import {Formik} from "formik";
import { useSelector, useDispatch } from 'react-redux'
import {fetchAllTweets} from "../../store/tweets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { DisplayError } from '../shared/components/display-error/DisplayError'
import { DisplayStatus } from '../shared/components/display-status/DisplayStatus'

export const TweetForm = () => {
	const tweet = {
		tweetContent: "",
	};

	const dispatch = useDispatch()

	const auth = useSelector(state => state.auth ? state.auth : null);

	const validator = Yup.object().shape({
		tweetContent: Yup.string()
			.required("tweet content is required"),
	});

	const submitTweet = (values, {resetForm, setStatus}) => {
		const tweetProfileId = auth?.profileId ?? null
		const tweet = {tweetProfileId, ...values}
			httpConfig.post("/apis/tweet/", tweet)
			.then(reply => {
					let {message, type} = reply;

					if(reply.status === 200) {
						resetForm();
						dispatch(fetchAllTweets())
					}
					setStatus({message, type});
				}
			);
	};


	return (
		<Formik
			initialValues={tweet}
			onSubmit={submitTweet}
			validationSchema={validator}
		>
			{TweetFormContent}
		</Formik>

	)
};

function TweetFormContent(props) {
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
			<Form className={"mb-3"} onSubmit={handleSubmit}>
				{/*controlId must match what is passed to the initialValues prop*/}

				<Form.Group className="mb-1" controlId="tweetContent">
					<Form.Label>Say Something</Form.Label>
					<InputGroup>
						<InputGroup.Text>
							<FontAwesomeIcon icon="pencil-alt"/>
						</InputGroup.Text>
						<FormControl
							className="form-control"
							name="tweetContent"
							type="text"
							value={values.tweetContent}
							placeholder="Say Something"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</InputGroup>

				</Form.Group>
				<DisplayError errors={errors} touched={touched} field={"tweetContent"} />

				<Form.Group className={"mt-3"}>
					<button
						className="btn btn-primary"
						type="submit"
					>
						Submit
					</button>
					{" "}
					<button
						className="btn btn-danger"
						onClick={handleReset}
						disabled={!dirty || isSubmitting}
					>Reset
					</button>
				</Form.Group>
			</Form>
			<DisplayStatus status={status} />
		</>


	)
}



