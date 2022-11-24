import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'Models'

type PostsResponse = {
  posts: Post[]
}

const apiName = 'Posts'

export const postApi = createApi({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://634e0ef4b8ce95a1dd7db0ed.mockapi.io/api/v1'
  }),
  tagTypes: [apiName],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => '/post',
      transformResponse: (response: any) => {
        return {
          posts: response
        }
      },
      //more: id for tag cache
      providesTags: (result: any) => {
        const { posts } = result
        return posts && posts?.length > 0
          ? [
              ...posts?.map(({ id }: { id: any }) => ({
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
    createPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `/post`,
        method: 'POST',
        body
      }),
      //more: id for tag cache
      invalidatesTags: [{ type: apiName, id: 'LIST' }]
    }),
    getPost: build.query<Post, string>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: apiName, id }]
      // keepUnusedDataFor: 5
    }),
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      query: (postUpdate: Post) => ({
        url: `post/${postUpdate.id}`,
        method: 'PUT',
        body: postUpdate
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: apiName, id: 'LIST' },
        { type: apiName, id }
      ]
    }),
    deletePost: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `post/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: [{ type: apiName, id: 'LIST' }]
    })
  })
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = postApi

export const {
  endpoints: { getPosts, createPost, getPost, updatePost, deletePost }
} = postApi
