import { type GameItem } from 'src/types/games'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'
import { CicleInfoResponse, type CiclesResponse } from 'src/types/cicles'

export const ciclesApi = createApi({
	reducerPath: ReducerPath.Cicles,
	tagTypes: ['Cicles'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getAllCicles: build.query<CiclesResponse, null>({
			query: () => ({
				url: `cicles`,
			}),
      providesTags: ['Cicles'],
		}),
    getCicleInfo: build.query<CicleInfoResponse, string>({
			query: (id) => ({
				url: `cicles/${id}`,
			}),
      providesTags: ['Cicles'],
		}),
	}),
})

export const { useGetAllCiclesQuery, useGetCicleInfoQuery } = ciclesApi
