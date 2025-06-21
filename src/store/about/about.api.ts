import {
	AboutGamesPage,
	AboutTraditionPage,
	type AboutGeneralPage,
} from 'src/types/about'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const aboutApi = createApi({
	reducerPath: ReducerPath.About,
	tagTypes: ['About'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getAboutGeneral: build.query<AboutGeneralPage, null>({
			query: () => ({
				url: `about/general`,
			}),
		}),
		getAboutEtnosport: build.query<AboutTraditionPage, null>({
			query: () => ({
				url: `about/tradition`,
			}),
		}),
		getAboutFun: build.query<AboutGamesPage, null>({
			query: () => ({
				url: `about/game`,
			}),
		}),
	}),
})

export const {
	useGetAboutGeneralQuery,
	useGetAboutEtnosportQuery,
	useGetAboutFunQuery,
} = aboutApi
