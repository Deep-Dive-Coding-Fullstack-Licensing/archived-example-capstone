import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ImageDropZone } from '../shared/components/ImageDropZone'
import { FormDebugger } from '../shared/components/FormDebugger'
export const EditProfileFormContent = (props) => {
	const {
		setFieldValue,
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
	console.log(values)

	return (
		<>
			<form onSubmit={handleSubmit}>
				{/*controlId must match what is passed to the initialValues prop*/}
				<div className="form-group">
					<label htmlFor="profileEmail">Email Address</label>
					<div className="input-group">
						<div className="input-group-prepend">
							<div className="input-group-text">
								<FontAwesomeIcon icon="envelope"/>
							</div>
						</div>
						<input
							className="form-control"
							name="profileEmail"
							type="email"
							value={values.profileEmail}
							placeholder="Enter email"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</div>
					{
						errors.profileEmail && touched.profileEmail && (
							<div className="alert alert-danger">
								{errors.profileEmail}
							</div>
						)
					}
				</div>

				<div className="form-group">
					<label htmlFor="profileHandle">@Handle</label>
					<div className="input-group">
						<div className="input-group-prepend">
							<div className="input-group-text">
								<FontAwesomeIcon icon="dove"/>
							</div>
						</div>
						<input
							className="form-control"
							name="profileAtHandle"
							type="text"
							value={values.profileAtHandle}
							placeholder="@Handle"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</div>
					{
						errors.profileAtHandle && touched.profileAtHandle && (
							<div className="alert alert-danger">
								{errors.profileAtHandle}
							</div>
						)
					}
				</div>

				<div className="form-group">
					<label htmlFor="profilePhone">Phone Number</label>
					<div className="input-group">
						<div className="input-group-prepend">
							<div className="input-group-text">
								<FontAwesomeIcon icon="phone"/>
							</div>
						</div>
						<input
							className="form-control"
							id="profilePhone"
							type="text"
							value={values.profilePhone}
							placeholder="Enter email"
							onChange={handleChange}
							onBlur={handleBlur}

						/>
					</div>

					{
						errors.profilePhone && touched.profilePhone && (
							<div className="alert alert-danger">
								{errors.profilePhone}
							</div>
						)

					}
				</div>
				<ImageDropZone
					formikProps={{
						values,
						handleChange,
						handleBlur,
						setFieldValue,
						fieldValue:"profileAvatarUrl"
					}}
				/>
				<div className="form-group">
					<button className="btn btn-primary mb-2" type="submit">Submit</button>
					<button
						className="btn btn-danger mb-2"
						onClick={handleReset}
						disabled={!dirty || isSubmitting}
					>Reset
					</button>
				</div>
				<FormDebugger {...props} />
			</form>

			{
				status && (<div className={status.type}>{status.message}</div>)
			}
		</>


	)
};