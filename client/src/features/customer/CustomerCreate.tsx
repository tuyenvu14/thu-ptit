import PageContainer from '@ant-design/pro-layout/lib/components/PageContainer'
import { Button } from 'antd'
import React from 'react'

export const CustomerCreate = () => {
  console.log('CustomerList Pagee')
  return (
    <PageContainer
      footer={[
        <div>
          <Button key="3">Hủy</Button>,
          <Button key="2" type="primary">
            Lưu
          </Button>
        </div>
      ]}
    >
      <div>CustomerCreate Page</div>
    </PageContainer>
  )
}

export default CustomerCreate
