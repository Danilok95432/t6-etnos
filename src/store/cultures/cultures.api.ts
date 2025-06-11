import { type TraditionItem } from 'src/types/cultures'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const culturesApi = createApi({
	reducerPath: ReducerPath.Tradition,
	tagTypes: ['Traditions'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getTraditionById: build.query<TraditionItem, string>({
			query: (traditionId) => ({
				url: `traditions/${traditionId}`,
			}),
		}),
	}),
})

export const { useGetTraditionByIdQuery } = culturesApi
