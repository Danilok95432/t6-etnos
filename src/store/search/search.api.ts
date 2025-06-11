import { type SearchItem } from 'src/types/search'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const searchApi = createApi({
	reducerPath: ReducerPath.Search,
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getSearched: build.query<SearchItem[], { search: string; limit: number }>({
			query: ({ search, limit }) => ({
				url: 'search',
				params: {
					q: search,
					limit,
				},
			}),
		}),
	}),
})

export const { useGetSearchedQuery } = searchApi
