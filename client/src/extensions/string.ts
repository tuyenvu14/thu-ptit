import { OrderPaymentStatus } from '../constants/enum'

export const getColorOrderPaymentStatus = (sourceType: any) => {
  switch (sourceType) {
    case OrderPaymentStatus.True:
      return 'blue'
    case OrderPaymentStatus.False:
      return 'red'

    default:
  }
}
