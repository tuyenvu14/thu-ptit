import PageContainer from '@ant-design/pro-layout/lib/components/PageContainer'
import { Button } from 'antd'
import React from 'react'
import { useSearchCustomersQuery } from './apiREST'

export const CustomerList = () => {
  const { data, error, isLoading } = useSearchCustomersQuery({
    offset: 0,
    limit: 2,
    ten: ''
  })

  console.log('CustomerList Pagee')
  return (
    <PageContainer
      title="Danh sách khách hàng"
      footer={[
        <div>
          <Button key="3">Hủy</Button>,
          <Button key="2" type="primary">
            Lưu
          </Button>
        </div>
      ]}
    >
      <div>CustomerList Page</div>
    </PageContainer>
  )
}

export default CustomerList
