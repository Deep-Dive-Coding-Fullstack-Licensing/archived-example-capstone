import React from 'react'
import styles from "./DisplayStatus.module.css"

export function DisplayStatus(props) {
  const {status} = props
  if(status) {
    return(
      <>
        <div className={styles.output}>
        <output className={status.type}>{status.message}</output>
        </div>
      </>

    )
  }
}