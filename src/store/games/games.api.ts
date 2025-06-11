import { type GameItem } from 'src/types/games'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const gamesApi = createApi({
	reducerPath: ReducerPath.Games,
	tagTypes: ['Games'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getGameById: build.query<GameItem, string>({
			query: (gameId) => ({
				url: `games/${gameId}`,
			}),
		}),
	}),
})

export const { useGetGameByIdQuery } = gamesApi
