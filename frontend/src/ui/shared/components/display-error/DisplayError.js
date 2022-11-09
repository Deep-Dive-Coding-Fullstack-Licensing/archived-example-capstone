import React from 'react'
import styles from './DisplayError.module.css'

export function DisplayError (props) {
  const { errors, touched, field } = props

  if (errors[field] && touched[field]) {

    return (
      <>
        <div className={'alert alert-danger'}>
          <output className={styles.output}>
            {errors[field]}
          </output>
        </div>
      </>
    )
  }
}