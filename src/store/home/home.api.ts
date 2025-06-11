import {
	type HomeFaq,
	type HomeObject,
	type HomePartnerItem,
	type HomePoster,
	type HomePreviewObject,
} from 'src/types/home-page'
import { type CardEventItem } from 'src/types/events'
import { type CardNewsItem } from 'src/types/news'
import { type VideoItem } from 'src/types/videos'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const homeApi = createApi({
	reducerPath: ReducerPath.Home,
	tagTypes: ['Home'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getHomePosters: build.query<HomePoster[], null>({
			query: () => ({
				url: `home/posters`,
			}),
		}),

		getHomeEvents: build.query<CardEventItem[], null>({
			query: () => ({
				url: `/home/events`,
			}),
		}),

		getHomeNews: build.query<CardNewsItem[], null>({
			query: () => ({
				url: 'home/news',
			}),
		}),
		getHomeVideos: build.query<VideoItem[], null>({
			query: () => ({
				url: 'home/videos',
			}),
		}),
		getHomePartners: build.query<HomePartnerItem[], null>({
			query: () => ({
				url: 'home/partners',
			}),
		}),
		getHomeObjects: build.query<HomeObject[], null>({
			query: () => ({
				url: 'home/objects',
			}),
		}),
		getHomeFaq: build.query<HomeFaq[], null>({
			query: () => ({
				url: 'home/faq',
			}),
		}),
		getHomePreviewObject: build.query<HomePreviewObject[], null>({
			query: () => ({
				url: 'home/preview_object',
			}),
		}),
	}),
})

export const {
	useGetHomeNewsQuery,
	useGetHomeVideosQuery,
	useGetHomePostersQuery,
	useGetHomePartnersQuery,
	useGetHomeFaqQuery,
	useGetHomeEventsQuery,
	useGetHomeObjectsQuery,
	useGetHomePreviewObjectQuery,
} = homeApi
