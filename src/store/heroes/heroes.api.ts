import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'
import { type HeroesGroupsResponse } from 'src/types/heroes'

export const heroesApi = createApi({
	reducerPath: ReducerPath.Heroes,
	tagTypes: ['About'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getHeroesGroups: build.query<HeroesGroupsResponse, null>({
			query: () => ({
				url: `heroes/groups`,
			}),
		}),
	}),
})

export const {
	useGetHeroesGroupsQuery,
} = heroesApi
