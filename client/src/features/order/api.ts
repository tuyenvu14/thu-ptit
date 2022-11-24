import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order } from 'Models'

type OrdersResponse = {
  orders: Order[]
  totalCount: number
}

const apiName = 'order'

export const orderApi = createApi({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/users/donhang'
  }),
  tagTypes: [apiName],
  endpoints: (build) => ({
    searchOrders: build.query<OrdersResponse, any>({
      query: (params) => ({
        url: `/`,
        method: 'GET',
        params
      }),
      transformResponse: (response: any) => {
        return {
          orders: response?.donHangs,
          totalCount: response?.totalCount
        }
      },
      // more: id for tag cache
      providesTags: (result: any) => {
        const { orders } = result
        return orders && orders?.length > 0
          ? [
              ...orders?.map(({ id }: { id: any }) => ({
                type: apiName,
                id
              })),
              { type: apiName, id: 'LIST' }
            ]
          : [{ type: apiName, id: 'LIST' }]
      },
      //Time cache for endpoint
      keepUnusedDataFor: 5
    }),
    getOrderDetail: build.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: apiName, id }]
    }),
    paymentOrder: build.mutation({
      query: (id) => ({
        url: `thanhtoan/${id}`,
        method: 'PUT'
        // body: postUpdate
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: apiName, id: 'LIST' },
        { type: apiName, id }
      ]
    })
  })
})

export const {
  useSearchOrdersQuery,
  useGetOrderDetailQuery,
  usePaymentOrderMutation
} = orderApi

export const {
  endpoints: { searchOrders, getOrderDetail, paymentOrder }
} = orderApi
