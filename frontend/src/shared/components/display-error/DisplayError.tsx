import {FormikProps, FormikValues} from 'formik'
import styles from "./DisplayError.module.css"

interface DisplayErrorProps {
  errors: FormikProps<FormikValues>['errors']
  touched: FormikProps<FormikValues>['touched']
  field: string
}

export function DisplayError(props: DisplayErrorProps) {
  const { errors, touched, field } = props
   if(errors[field] && touched[field]) {
     return (
       <div className={'alert alert-danger'}>
          <output className={styles.output}>
            {errors[field] as string}
          </output>
       </div>
     )
   } else {
     return <></>
   }
}
