import { Spin } from 'antd'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useGetOrderDetailQuery, usePaymentOrderMutation } from './api'
import { OrderPaymentForm } from './OrderPaymentForm'

export const OrderPayment = () => {
  //@ts-ignore
  const { id } = useParams()
  const history = useHistory()
  const { data, isLoading, error } = useGetOrderDetailQuery(id)

  const [payment, { isLoading: isPayment, isSuccess, isError }] =
    usePaymentOrderMutation()

  useEffect(() => {
    if (isSuccess) {
      history.goBack()
    }
  }, [isSuccess])

  const handlePaymentOrder = () => {
    payment(id)
  }

  return (
    <Spin spinning={isLoading || isPayment}>
      {data ? (
        <OrderPaymentForm
          title="Thanh toán"
          data={data}
          handlePaymentOrder={handlePaymentOrder}
        />
      ) : null}
    </Spin>
  )
}

export default OrderPayment
