import { type ObjectItem, type ObjectsInfo } from 'src/types/objects'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/helpers/consts'

export const objectsApi = createApi({
	reducerPath: ReducerPath.Objects,
	tagTypes: ['Objects'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getObjectsInfo: build.query<ObjectsInfo, null>({
			query: () => ({
				url: `objects`,
			}),
		}),
		getObjectById: build.query<ObjectItem, string>({
			query: (id) => ({
				url: `objects/${id}`,
			}),
		}),
	}),
})

export const { useGetObjectByIdQuery, useGetObjectsInfoQuery } = objectsApi
