import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { customerApi } from '../features/customer/apiREST'
import { postApi } from '../features/post/api'
import { loginApi } from '../features/login/api'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { rootReducer } from './rootReducer'
import persistStore from 'redux-persist/es/persistStore'
import { orderApi } from '../features/order/api'

const persisConfig = {
  key: 'rootAdmin',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(
  persisConfig,
  combineReducers(rootReducer)
)

export const store = configureStore({
  reducer: persistedReducer,
  //  {
  //   counter: counterReducer,
  //   [customerApi.reducerPath]: customerApi.reducer,
  //   [loginApi.reducerPath]: loginApi.reducer,
  //   [postApi.reducerPath]: postApi.reducer
  // },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      customerApi.middleware,
      loginApi.middleware,
      postApi.middleware,
      orderApi.middleware
    )
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
