import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { loginAdmin } from './api'
import { Login, LoginResponse } from 'Models'

// export interface AuthState {
//   accessToken: string
//   user: Login
// }

const initialState: LoginResponse = {
  accessToken: null,
  user: null,
  permission: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('persist:rootAdmin')
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(loginAdmin.matchPending, (state, action) => {
        // console.log('pending', action)
      })
      .addMatcher(loginAdmin.matchFulfilled, (state, action) => {
        // console.log('fulfilled', action)
        console.log(action, '----------------------------action')
        const {
          payload: { accessToken, user, permission }
        } = action || {}
        state.user = user
        state.permission = permission
        state.accessToken = accessToken
        // state.permission = loginAdminWithSSOApp.permission

        // const { authToken } = loginAdminWithSSOApp
        // setAuthCookie(authToken)
        // state.isAuthenticated = true
      })
      .addMatcher(loginAdmin.matchRejected, (state, action) => {
        // console.log('rejected', action)
      })
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export const { logout } = authSlice.actions

export default authSlice.reducer

export const selectAccessToken = (state: RootState) => state.auth.accessToken

export const selectUserLoggedIn = (state: RootState) => state.auth.user

export const selectUserPermission = (state: RootState) => state.auth.permission
