import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { Login, LoginResponse } from 'Models'

const apiName = 'login'

export const loginApi = createApi({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/users'
  }),
  tagTypes: [apiName],
  endpoints: (build) => ({
    loginAdmin: build.mutation<LoginResponse, Partial<Login>>({
      query: (params) => ({
        url: `/signin`,
        headers: {
          'Access-Control-Allow-Origin': 'true'
        },
        method: 'POST',
        params
      })
    })
  })
})

export const { useLoginAdminMutation } = loginApi

export const {
  endpoints: { loginAdmin }
} = loginApi
