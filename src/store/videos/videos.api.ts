import { type VideoItem } from 'src/types/videos'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'
import type { FiltrationInfo } from 'src/types/global'

export const videosApi = createApi({
	reducerPath: ReducerPath.Videos,
	tagTypes: ['Videos'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getVideosMonths: build.query<VideoItem[], { date: string; category: string }>({
			query: ({ date, category = '' }) => ({
				url: 'videos',
				params: {
					d: date,
					cat: category,
				},
			}),
		}),
		getVideosFiltration: build.query<FiltrationInfo, null>({
			query: () => ({
				url: `videos_filter_info`,
			}),
		}),
		getVideoById: build.query<VideoItem, string>({
			query: (videoId) => ({
				url: `videos/${videoId}`,
			}),
		}),
	}),
})

export const { useGetVideosMonthsQuery, useGetVideoByIdQuery, useGetVideosFiltrationQuery } =
	videosApi
