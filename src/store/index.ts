import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { breadCrumbsReducer } from 'src/modules/bread-crumbs/store/bread-crumbs.slice'
import { homeApi } from 'src/store/home/home.api'
import { aboutApi } from 'src/store/about/about.api'
import { objectsApi } from 'src/store/objects/objects.api'
import { newsApi } from 'src/store/news/news.api'
import { eventsApi } from 'src/store/events/events.api'
import { culturesApi } from 'src/store/cultures/cultures.api'
import { videosApi } from 'src/store/videos/videos.api'
import { searchApi } from 'src/store/search/search.api'

import { NameSpace } from 'src/helpers/consts'
import { gamesApi } from './games/games.api'
import { modalReducer } from 'src/modules/modal/store/modal.slice'
import { authApi } from './auth/auth.api'

export const store = configureStore({
	reducer: {
		[NameSpace.BreadCrumbs]: breadCrumbsReducer,
		[NameSpace.Modal]: modalReducer,
		[objectsApi.reducerPath]: objectsApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		[eventsApi.reducerPath]: eventsApi.reducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[culturesApi.reducerPath]: culturesApi.reducer,
		[videosApi.reducerPath]: videosApi.reducer,
		[searchApi.reducerPath]: searchApi.reducer,
		[aboutApi.reducerPath]: aboutApi.reducer,
		[gamesApi.reducerPath]: gamesApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			objectsApi.middleware,
			newsApi.middleware,
			eventsApi.middleware,
			homeApi.middleware,
			culturesApi.middleware,
			videosApi.middleware,
			searchApi.middleware,
			aboutApi.middleware,
			gamesApi.middleware,
			authApi.middleware,
		),
})

setupListeners(store.dispatch)
