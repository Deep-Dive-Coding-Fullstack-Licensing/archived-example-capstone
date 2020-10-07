import React from "react"
import * as Yup from "yup";
import { httpConfig } from '../shared/utils/http-config'
import { Formik } from "formik";
import { EditProfileFormContent } from './EditProfileFormContent'


export const EditProfileForm = (props) => {
	const {profile} = props

	const validationObject = Yup.object().shape({
		profileEmail: Yup.string()
		.email("email must be a valid email"),
		profilePhone: Yup.string()
		.min(10, "phone number is to short")
		.max(20, "phone Number is to long."),
		profileAvatarUrl: Yup.mixed(),
		profileAtHandle: Yup.string()
		.min(1, "profile @handle is to long.")
	});

	function submitEditedProfile (values, {resetForm, setStatus}) {

		const submitUpdatedProfile = (updatedProfile) => {
			httpConfig.put(`/apis/profile/${profile.profileId}`, updatedProfile)
			.then(reply => {
				let {message, type} = reply;

				if (reply.status === 200) {
					resetForm();
				}
				setStatus({message, type});
				return (reply)
			})
		};

		if (values.profileAvatarUrl !== undefined) {
			httpConfig.post(`/apis/image-upload/`, values.profileAvatarUrl)
			.then(reply => {
					let {message, type} = reply;

					if (reply.status === 200) {
						submitUpdatedProfile({...values, profileAvatarUrl:message})
					} else {
						setStatus({message, type});
					}
				}
			);
		} else {
			submitUpdatedProfile(values);
		}
	}

	return (
		<Formik
			initialValues={profile}
			onSubmit={submitEditedProfile}
			validationSchema={validationObject}
		>
			{EditProfileFormContent}
		</Formik>
	)

};