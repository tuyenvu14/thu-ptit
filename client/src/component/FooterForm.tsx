import { Button, Form } from 'antd'
import { useHistory } from 'react-router'
import { ModeForm } from '../constants/enum'

type FooterFormProps = {
  modeForm: ModeForm
}

const FooterForm = (props: FooterFormProps) => {
  const { modeForm } = props
  const history = useHistory()

  return modeForm !== ModeForm.View ? (
    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
      <Button type="primary" htmlType="submit">
        {modeForm === ModeForm.Create ? 'Lưu' : 'Cập nhật'}
      </Button>
      <Button className="ml-5" onClick={() => history.goBack()}>
        Hủy
      </Button>
    </Form.Item>
  ) : null
}

export default FooterForm
