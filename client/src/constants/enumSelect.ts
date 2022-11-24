import { OrderPaymentStatus } from './enum'

export const OrderPaymentStatusSelect = [
  {
    value: OrderPaymentStatus.False,
    label: 'Chưa thanh toán'
  },
  {
    value: OrderPaymentStatus.True,
    label: 'Đã thanh toán'
  }
]
