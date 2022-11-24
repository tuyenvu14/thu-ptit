import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/users/khachhang'
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    // getPokemonSpecies: builder.query({
    //   query: (name: string) => `pokemon-species/${name}`
    // }),
    searchCustomers: builder.query({
      query: (params) => ({
        url: `/`,
        method: 'GET',
        params
      })
    })
  })
})

// Export hooks for usage in functional components
export const { useSearchCustomersQuery } = customerApi
