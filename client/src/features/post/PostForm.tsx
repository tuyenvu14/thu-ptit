import { FormProvider, useForm } from 'react-hook-form'
import { Post } from 'Models'
import { Button, Card, Form, Input } from 'antd'
import FormItem from '../../component/FormItem'
import { useHistory } from 'react-router'
import { ModeForm } from '../../constants/enum'
import FooterForm from '../../component/FooterForm'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import yupExtension from '../../extensions/yup'

type Inputs = {
  title: string
  handleSubmitForm(args: Post): void
  data?: Post
  modeForm: ModeForm
}

const schema = yup
  .object()
  .shape({
    type: yupExtension.stringRequired,
    content: yupExtension.stringRequired
  })
  .required()

const PostForm = (props: Inputs) => {
  const { title, handleSubmitForm, data, modeForm } = props

  const history = useHistory()
  const disable = modeForm === ModeForm.View ? true : false

  const formProps = useForm<Post>({
    defaultValues: {
      type: data ? data.type : undefined,
      content: data ? data?.content : undefined
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit, register, watch } = formProps

  const onSubmit = (data: Post) => {
    //handle data....
    // console.log(data, '---------------dataInput')
    handleSubmitForm(data)
  }

  return (
    <Card size="small" title={title}>
      <FormProvider {...formProps}>
        <Form onFinish={handleSubmit((e) => onSubmit(e))}>
          <FormItem
            label="Loại"
            fieldName="type"
            required={true}
            isValidate={true}
          >
            {({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={'Loại'}
                  disabled={disable}
                />
                {/* validate truyen thong */}
                {/* <input
                  {...register('type', {
                    maxLength: { value: 2, message: 'error message' },
                    required: 'Mục này không được để trống',
                  })}
                  hidden={true}
                />
                <div>{errors.type?.message}</div> */}
              </>
            )}
          </FormItem>

          <FormItem
            label="Nội dung"
            fieldName="content"
            required={true}
            isValidate={true}
          >
            {({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value)}
                placeholder={'Nội dung'}
                disabled={disable}
              />
            )}
          </FormItem>
          <FooterForm modeForm={modeForm} />
        </Form>
      </FormProvider>
    </Card>
  )
}

export default PostForm
