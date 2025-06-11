import { type CardNewsItem, type NewsItem } from 'src/types/news'
import { type FiltrationInfo } from 'src/types/global'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const newsApi = createApi({
	reducerPath: ReducerPath.News,
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getNewsMonths: build.query<CardNewsItem[], { date: string; category: string }>({
			query: ({ date = '0', category = '0' }) => ({
				url: 'news',
				params: {
					d: date,
					cat: category,
				},
			}),
		}),
		getNewsFiltration: build.query<FiltrationInfo, null>({
			query: () => ({
				url: `news_filter_info`,
			}),
		}),
		getNewsById: build.query<NewsItem, string>({
			query: (newsId) => ({
				url: `news/${newsId}`,
			}),
		}),
	}),
})

export const { useGetNewsMonthsQuery, useGetNewsFiltrationQuery, useGetNewsByIdQuery } = newsApi
