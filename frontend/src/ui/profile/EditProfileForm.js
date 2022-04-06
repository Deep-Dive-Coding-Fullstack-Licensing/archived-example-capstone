import React from 'react'
import * as Yup from 'yup'
import { httpConfig } from '../shared/utils/httpConfig'
import { Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, FormControl, Image, InputGroup } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { DisplayError } from '../shared/components/display-error/DisplayError'
import { DisplayStatus } from '../shared/components/display-status/DisplayStatus'

export const EditProfileForm = (props) => {
  const { profile } = props

  const validationObject = Yup.object().shape({
    profileEmail: Yup.string()
      .email('email must be a valid email'),
    profilePhone: Yup.string()
      .min(10, 'phone number is to short')
      .max(20, 'phone Number is to long.'),
    profileAvatarUrl: Yup.mixed(),
    profileAtHandle: Yup.string()
      .min(1, 'profile @handle is to long.')
  })

  function submitEditedProfile (values, { resetForm, setStatus }) {

    const submitUpdatedProfile = (updatedProfile) => {
      httpConfig.put(`/apis/profile/${profile.profileId}`, updatedProfile)
        .then(reply => {
          let { message, type } = reply

          if (reply.status === 200) {
            resetForm()
          }
          setStatus({ message, type })
          return (reply)
        })
    }

    if (values.profileAvatarUrl !== undefined) {
      httpConfig.post(`/apis/image-upload/`, values.profileAvatarUrl)
        .then(reply => {
            let { message, type } = reply

            if (reply.status === 200) {
              submitUpdatedProfile({ ...values, profileAvatarUrl: message })
            } else {
              setStatus({ message, type })
            }
          }
        )
    } else {
      submitUpdatedProfile(values)
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

}

function EditProfileFormContent (props) {
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
  } = props

  return (
    <>
      <Form onSubmit={handleSubmit} className="bg-light border rounded p-3">
        <h2>Edit Profile Form</h2>
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
          <DisplayError errors={errors} touched={touched} field={'profileEmail'}/>
        </Form.Group>
        <Form.Group className="mb-1" controlId="profileAtHandle">
          <Form.Label>Handle </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon="dove"/>
            </InputGroup.Text>
            <FormControl
              className="form-control"
              name="profileAtHandle"
              type="text"
              value={values.profileAtHandle}
              placeholder="handle"
              onChange={handleChange}
              onBlur={handleBlur}

            />
          </InputGroup>
          <DisplayError errors={errors} touched={touched} field={'profileAtHandle'}/>
        </Form.Group>

        <ImageDropZone
          formikProps={{
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            fieldValue: 'profileAvatarUrl'
          }}
        />
        <Form.Group className={"mt-3"}>
        <Button className="btn btn-primary" type="submit">Submit</Button>
        {' '}
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

function ImageDropZone ({ formikProps }) {

  const onDrop = React.useCallback(acceptedFiles => {

    const formData = new FormData()
    formData.append('image', acceptedFiles[0])

    formikProps.setFieldValue(formikProps.fieldValue, formData)

  }, [formikProps])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Form.Group className={"mb-3"} {...getRootProps()}>
      <Form.Label>User Avatar</Form.Label>

      <InputGroup size="lg" className="">
        {
          formikProps.values.profileAvatarUrl &&
          <>
            <div className="bg-transparent m-0">
              <Image  fluid={true} height={100} rounded={true} thumbnail={true} width={100} alt="user avatar" src={formikProps.values.profileAvatarUrl} />
            </div>

          </>
        }
        <div className="d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
        <FormControl
          aria-label="profile avatar file drag and drop area"
          aria-describedby="image drag drop area"
          className="form-control-file"
          accept="image/*"
          onChange={formikProps.handleChange}
          onBlur={formikProps.handleBlur}
          {...getInputProps()}
        />
            {
              isDragActive ?
                <span className="align-items-center" >Drop image here</span> :
                <span className="align-items-center" >Drag and drop image here, or click here to select an image</span>
            }
          </div>


      </InputGroup>
    </Form.Group>
  )
}


