import { type CardEventItem, type EventItem } from 'src/types/events'
import { type ProgramDay } from 'src/types/program'
import type { FiltrationInfo } from 'src/types/global'
import { type CardNewsItem } from 'src/types/news'
import { type VideoItem } from 'src/types/videos'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'
import { ParticipantResponse } from 'src/types/participants'

export const eventsApi = createApi({
	reducerPath: ReducerPath.Events,
	tagTypes: ['Events'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getEventsMonths: build.query<CardEventItem[], { date: string; category: string }>({
			query: ({ date = '0', category = '0' }) => ({
				url: 'events',
				params: {
					d: date,
					cat: category,
				},
			}),
		}),
		getEventsFiltration: build.query<FiltrationInfo, null>({
			query: () => ({
				url: `events_filter_info`,
			}),
		}),

		getEventById: build.query<EventItem, string>({
			query: (eventId) => ({
				url: `events/${eventId}`,
			}),
		}),
		getEventNewsById: build.query<CardNewsItem[], string>({
			query: (eventId) => ({
				url: `news`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventVideosById: build.query<VideoItem[], string>({
			query: (eventId) => ({
				url: `videos`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventProgramById: build.query<ProgramDay[], string>({
			query: (eventId) => ({
				url: `events/program`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventParticipantsById: build.query<ParticipantResponse, string>({
			query: (eventId) => ({
				url: `reg_users`,
				params: {
					id_event: eventId,
				},
			}),
		}),
	}),
})

export const {
	useGetEventsFiltrationQuery,
	useGetEventsMonthsQuery,
	useGetEventByIdQuery,
	useGetEventNewsByIdQuery,
	useGetEventVideosByIdQuery,
	useGetEventProgramByIdQuery,
	useGetEventParticipantsByIdQuery,
} = eventsApi
