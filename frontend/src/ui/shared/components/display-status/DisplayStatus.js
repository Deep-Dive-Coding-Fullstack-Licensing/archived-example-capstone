import React from 'react'


export function DisplayStatus(props) {
  const {status} = props
  if(status) {
    return(
      <>
        <div className={status.type}>
          <output>
            {status.message}
          </output>
        </div>
      </>

    )
  }
}