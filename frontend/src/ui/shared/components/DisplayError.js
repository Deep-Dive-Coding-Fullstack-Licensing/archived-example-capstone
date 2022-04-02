import React  from 'react'

export function DisplayError(props) {
  const { errors, touched, field} = props


  if( errors[field] && touched[field]) {
    return  <output className="alert alert-danger">
      {errors[field]}
    </output>
  } else {
    return(
      <></>
    )

  }
}