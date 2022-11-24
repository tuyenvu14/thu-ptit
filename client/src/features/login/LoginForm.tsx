import { Button, Card, Form, Input } from 'antd'
import { Login } from 'Models'
import { FormProvider, useForm } from 'react-hook-form'
import FormItem from '../../component/FormItem'
import './index.css'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import yupExtension from '../../extensions/yup'

type LoginFormProps = {
  handleSubmitForm(args: Login): void
}

const schema = yup.object().shape({
  username: yupExtension.stringRequired,
  password: yupExtension.stringRequired
})

const LoginForm = (props: LoginFormProps) => {
  const { handleSubmitForm } = props

  const formProps = useForm<Login>({
    defaultValues: {
      username: undefined,
      password: undefined
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit } = formProps

  const onSubmit = (data: Login) => {
    // console.log(data)
    handleSubmitForm(data)
  }

  // chưa có useToast provider
  return (
    <div className="site-card-wrapper">
      <Card title="MYPROJECT-LOGIN" bordered={false} style={{ width: 500 }}>
        <FormProvider {...formProps}>
          <Form onFinish={handleSubmit((e) => onSubmit(e))}>
            <FormItem
              fieldName="username"
              label="Username"
              required={true}
              isValidate={true}
            >
              {({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={'Username'}
                  //   disabled={false}
                />
              )}
            </FormItem>
            <FormItem
              fieldName="password"
              label="Password"
              required={true}
              isValidate={true}
            >
              {({ field: { onChange, onBlur, value, ref } }) => (
                <Input.Password
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={'Password'}
                  //   disabled={false}
                />
              )}
            </FormItem>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </FormProvider>
      </Card>
      {/* <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row> */}
    </div>
  )
  //   <Button onClick={() => handleLogin()}>Login</Button>
}

export default LoginForm
