
import styles from './DisplayStatus.module.css'

interface DisplayStatusProps {
  status: {
    type: string,
    message: string
  }
}

export function DisplayStatus(props: DisplayStatusProps): JSX.Element {
  const {status} = props
  if(status) {
    return(
      <>
        <div className={status.type}>
          <output className={styles.output}>
            {status.message}
          </output>
        </div>
      </>

    )

  }
  return <></>
}