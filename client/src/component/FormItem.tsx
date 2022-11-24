import { Form } from 'antd'
import {
  Controller,
  ControllerRenderProps,
  useForm,
  useFormContext
} from 'react-hook-form'
import { FORM_ITEM_LAYOUT } from '../constants'
import ErrorMessage from './ErrorMassage'

type FormItemProps = {
  label: string
  fieldName: string
  required: boolean
  isValidate: boolean
  children: ({ field }: { field: ControllerRenderProps }) => React.ReactElement
  defaultValue?: any
}

const FormItem = (props: FormItemProps) => {
  const { label, fieldName, isValidate, required, children, defaultValue } =
    props

  const { control } = useFormContext()

  return (
    <Form.Item
      label={label}
      required={required}
      name={fieldName}
      {...FORM_ITEM_LAYOUT}
      labelAlign={'left'}
    >
      <Controller
        control={control}
        name={fieldName}
        render={children}
        defaultValue={defaultValue}
      />
      <ErrorMessage fieldName={fieldName} isValidate={isValidate} />
    </Form.Item>
  )
}

export default FormItem
