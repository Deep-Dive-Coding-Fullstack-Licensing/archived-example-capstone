
import * as Yup from "yup";
import {Formik, FormikHelpers, FormikProps} from "formik";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, FormControl, InputGroup } from 'react-bootstrap'

import { DisplayError } from '../../shared/components/display-error/DisplayError'
import { DisplayStatus } from '../../shared/components/display-status/DisplayStatus'
import { useJwtToken } from '../../shared/hooks/useJwtHook.js'
import {MutationResponse, usePostTweetMutation} from '../../store/apis.js'
import {PartialTweet} from "../../shared/interfaces/Tweet.ts";



export const TweetForm = () => {

	const [submit] = usePostTweetMutation()
	const tweet = {
		tweetContent: "",
		tweetProfileId: ""
	};

	const {profile} = useJwtToken()
	const validator = Yup.object().shape({
		tweetContent: Yup.string()
			.required("tweet content is required"),
	});

	const submitTweet =async (values: PartialTweet, formikHelpers: FormikHelpers<PartialTweet>) => {


		const {resetForm, setStatus} = formikHelpers
		const tweetProfileId = profile?.profileId ?? ""
		const tweet: PartialTweet = {tweetProfileId: tweetProfileId, tweetContent: values.tweetContent}

		const result = await submit(tweet) as MutationResponse

		const {
			data: response, error} = result

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
			initialValues={tweet}
			onSubmit={submitTweet}
			validationSchema={validator}
		>
			{TweetFormContent}
		</Formik>

	)
};

function TweetFormContent(props: FormikProps<PartialTweet>) {
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



