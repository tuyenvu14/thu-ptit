import { useAppDispatch, useAppSelector } from '../../app/hook'
import { decrement, increment } from '../counter/counterSlice'
import { useGetPostsQuery } from '../post/api'

const OrderImportList = () => {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      Đơn hàng nhập
    </div>
  )
}

export default OrderImportList
