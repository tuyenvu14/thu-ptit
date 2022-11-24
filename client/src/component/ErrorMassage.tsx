import { useFormContext, get } from 'react-hook-form'

type ErrorMessageProps = {
  fieldName: string
  isValidate: boolean
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { fieldName, isValidate } = props
  const {
    formState: { errors }
  } = useFormContext()

  return isValidate ? (
    <div className="ant-form-item-explain-error">
      {get(errors, fieldName)?.message ?? null}
    </div>
  ) : null
}

export default ErrorMessage
