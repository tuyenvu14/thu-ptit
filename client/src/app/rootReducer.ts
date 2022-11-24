import counterReducer from '../features/counter/counterSlice'
import { customerApi } from '../features/customer/apiREST'
import { loginApi } from '../features/login/api'
import authReducer from '../features/login/authSlice'
import { orderApi } from '../features/order/api'
import { postApi } from '../features/post/api'

export const rootReducer = {
  counter: counterReducer,
  auth: authReducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer
}
