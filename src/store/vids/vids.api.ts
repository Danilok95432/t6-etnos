import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'
import { VidItemResponse, VidsResponse } from 'src/types/vids'

export const vidsApi = createApi({
	reducerPath: ReducerPath.Vids,
	tagTypes: ['Vids', 'VidInfo'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getAllVids: build.query<VidsResponse, number>({
			query: (is_etnosport) => ({
				url: `vids`,
				params: {
					is_etnosport,
				}
			}),
		}),
		getVidInfoById: build.query<VidItemResponse, string>({
			query: (id) => ({
				url: `vids/${id}`,
				params: {
					id,
				}
			}),
		}),
	}),
})

export const {
	useGetAllVidsQuery,
	useGetVidInfoByIdQuery,
} = vidsApi
