import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'
import { PartialTweet, Tweet } from '../shared/interfaces/Tweet.ts'
import {PartialProfile, Profile, SignIn} from '../shared/interfaces/Profile.ts'
import {Like, PartialLike} from "../shared/interfaces/Like.ts";

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

    getLikesByLikeTweetId: builder.query<Like[], string>({
      query: (tweetId) => `/like/likeTweetId/${tweetId}`,
      transformResponse:transformResponse<Like[]>,
      providesTags: ['Tweet']

}),
    toggleLike: builder.mutation<ClientResponse, PartialLike>({
      transformResponse: transformMutationResponses,
      transformErrorResponse: transformErrorResponses,
      query (body: PartialLike) {
        return {
          url: '/like',
          method: 'POST',
          body
        }
      },}),
    getProfileByProfileId: builder.query<Profile, string>({
        query: (profileId) => `/profile/${profileId}`,
      transformResponse:transformResponse<Profile>
    }),
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

//create a function that includes a generic type for transformResponse
function transformResponse<T> (response: ServerResponse): T {
  return response.data as T
}

export const {
  useGetAllTweetsQuery, usePostTweetMutation,
  useGetProfileByProfileIdQuery,
  usePostSignInMutation,
  usePostSignUpMutation,
    useGetLikesByLikeTweetIdQuery,
   useToggleLikeMutation
} = apis
