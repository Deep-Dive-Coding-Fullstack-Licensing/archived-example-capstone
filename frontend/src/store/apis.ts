import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'
import { PartialTweet, Tweet } from '../shared/interfaces/Tweet.ts'
import {PartialProfile, SignIn} from '../shared/interfaces/Profile.ts'

export interface ServerResponse {
  status: number,
  data: unknown,
  message: string | null
}

export interface ClientResponse extends ServerResponse {
  type: 'alert alert-success' | 'alert alert-danger'
}

export interface ClientResponseForSignIn extends ClientResponse {
  authorization: string | undefined
}

export interface MutationResponse {
  data: ClientResponse | undefined,
  error: ClientResponse | undefined
}

export const apis = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/apis' }),
  tagTypes: ['Tweet'],
  endpoints: (builder) => ({
    getAllTweets: builder.query<Tweet[], string>({
      query: () => '/tweet',
      transformResponse: (response: { data: Tweet[] }) => response.data,
      providesTags: ['Tweet']
    }),

    postTweet: builder.mutation<ClientResponse, PartialTweet>({
      transformResponse: transformMutationResponses,
      transformErrorResponse: transformErrorResponses,
      query (body: PartialTweet) {
        return {
          url: '/tweet',
          method: 'POST',
          body
        }
      },

      invalidatesTags: ['Tweet']
    }),
    postSignIn: builder.mutation<ClientResponseForSignIn, SignIn>({
      query (body: SignIn) {
        return {
          url: '/sign-in',
          method: 'POST',
          body
        }
      },
      transformErrorResponse: transformErrorResponses,
      transformResponse: (response: ServerResponse, meta): ClientResponseForSignIn => {

        const authorization = meta?.response?.headers.get('authorization') ?? undefined

        if (response.status === 200) {
          return {
            status: response.status,
            data: response.data,
            message: response.message,
            type: 'alert alert-success',
            authorization
          }
        }
        return {
          status: response.status,
          data: response.data,
          message: response.message,
          type: 'alert alert-danger',
          authorization
        }
      }
    }),
    PostSignUp: builder.mutation<ClientResponse, PartialProfile>({
      transformResponse: transformMutationResponses,
      transformErrorResponse: transformErrorResponses,
      query (body: PartialProfile) {
        return {
          url: '/sign-up',
          method: 'POST',
          body
        }
    }
  })
})
})

function transformMutationResponses (response: ServerResponse): ClientResponse {
  if (response.status === 200) {
    return {
      status: response.status,
      data: response.data,
      message: response.message,
      type: 'alert alert-success',
    }
  }
  return {
    status: response.status,
    data: response.data,
    message: response.message,
    type: 'alert alert-danger',
  }
}

function transformErrorResponses (): ClientResponse {
  return {
    status: 500,
    data: null,
    message: 'An unexpected error occurred',
    type: 'alert alert-danger',
  }
}

export const { useGetAllTweetsQuery, usePostTweetMutation, usePostSignInMutation, usePostSignUpMutation } = apis
