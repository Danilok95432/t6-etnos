import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import { MAIN_PROD_URL } from 'src/helpers/consts'

export const authApi = createApi({
  reducerPath: 'auth/api',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: MAIN_PROD_URL,
  }),
  endpoints: (build) => ({
    getRegistrationCode: build.mutation<{status: string, errortext?: string}, string>({
      query: (phone) => ({
        url: '/registration/getcode',
        method: 'GET',
        params: {
          phone,
        }
      }),
    }),
    checkRegistrationCode: build.mutation<{status: string}, FieldValues>({
      query: (formData) => ({
        url: '/registration/checkcode',
        method: 'POST',
        body: formData,
      }),
    }),
    loginUser: build.mutation<void, FieldValues>({
      query: (formData) => ({
        url: '/auth',
        method: 'POST',
        body: formData,
      }),
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
})
export const {
  useLoginUserMutation,
  useGetRegistrationCodeMutation,
  useLogoutUserMutation,
  useCheckRegistrationCodeMutation,
} = authApi
