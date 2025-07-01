import { Route, Routes } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'
import { MainLayout } from 'src/routes/main-layout/main-layout'

import { HomePage } from 'src/pages/home-page/home-page'

import { AboutLayout } from 'src/pages/about-page/about-layout'
import { AboutGeneral } from 'src/pages/about-page/layout/about-general/about-general'

import { ObjectsLayout } from 'src/pages/objects-page/objects-layout'
import { ObjectsList } from 'src/pages/objects-page/layout/objects-list/objects-list'
import { ObjectDetails } from 'src/pages/objects-page/layout/object-details/object-details'

// import { NewsDetails } from 'src/pages/news-page/layout/news-details/news-details'
import { NewsDetailsNew } from 'src/pages/news-page/layout/news-details/news-details-new'
import { News } from 'src/pages/news-page/layout/news/news'
import { NewsLayout } from 'src/pages/news-page/news-layout'

import { VideosLayout } from 'src/pages/videos-page/layout/videos-layout'
import { Videos } from 'src/pages/videos-page/layout/videos/videos'
import { VideoDetails } from 'src/pages/videos-page/layout/video-details/video-details'

import { EventsLayout } from 'src/pages/events-page/events-layout'
import { EventsListPage } from 'src/pages/events-page/layout/events-list-page/events-list-page'
import { EventDetailsLayout } from 'src/pages/events-page/layout/events-details/layout/event-details-layout'
import { EventParticipants } from 'src/pages/events-page/layout/events-details/layout/event-participants/event-participants'
import { EventMaps } from 'src/pages/events-page/layout/events-details/layout/event-maps/layout/event-maps'
import { EventTeams } from 'src/pages/events-page/layout/events-details/layout/event-teams/event-teams'

import { SearchPage } from 'src/pages/search-page/search-page'
import { EventDetails } from 'src/pages/events-page/layout/events-details/layout/event-details/event-details'
import { ParticipantLayout } from 'src/pages/participant-page/participant-layout'
import { ParticipantDetailsLayout } from 'src/pages/participant-page/layout/participant-details/layout/participant-details-layout'
import { ParticipantDetails } from 'src/pages/participant-page/layout/participant-details/layout/participant-details/participant-details'
import { ParticipantEvents } from 'src/pages/participant-page/layout/participant-details/layout/participant-events/participant-events'
import { ParticipantGroups } from 'src/pages/participant-page/layout/participant-details/layout/participant-groups/participant-groups'
import { ParticipantEtnosport } from 'src/pages/participant-page/layout/participant-details/layout/participant-etnosport/participant-etnosport'
import { ParticipantEnjoy } from 'src/pages/participant-page/layout/participant-details/layout/participant-enjoy/participant-enjoy'
import { ParticipantGallery } from 'src/pages/participant-page/layout/participant-details/layout/participant-gallery/participant-gallery'
import { ParticipantArticles } from 'src/pages/participant-page/layout/participant-details/layout/participant-articles/participant-articles'
import { AboutEtnosportLayout } from 'src/pages/about-page/layout/about-etnosport/about-etnosport-layout'
import { AboutFunLayout } from 'src/pages/about-page/layout/about-fun/about-fun-layout'
import { EtnosportList } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-list/etnosport-list'
import { EtnosportDetailsLayout } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/etnosport-details-layout'
import { EtnosportDetails } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-details/etnosport-details'
import { EtnosportRules } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-rules/etnosport-rules'
import { EtnosportParticipants } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-participants/etnosport-participants'
import { EtnosportOrgs } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-orgs/etnosport-orgs'
import { EtnosportNews } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-news/etnosport-news'
import { EtnosportVideos } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-videos/etnosport-videos'
import { EtnosportEvents } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-events/etnosport-events'
import { FunList } from 'src/pages/about-page/layout/about-fun/layout/fun-list/fun-list'
import { FunDetailsLayout } from 'src/pages/about-page/layout/about-fun/layout/fun-details/fun-details-layout'
import { FunDetails } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-details/fun-details'
import { FunRules } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-rules/fun-rules'
import { FunParticipants } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-participants/fun-participants'
import { FunOrgs } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-orgs/fun-orgs'
import { FunNews } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-news/fun-news'
import { FunVideos } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-videos/fun-videos'
import { FunEvents } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-events/fun-events'
import { EtnosportGroups } from 'src/pages/about-page/layout/about-etnosport/layout/etnosport-details/layout/etnosport-groups/etnosport-groups'
import { FunGroups } from 'src/pages/about-page/layout/about-fun/layout/fun-details/layout/fun-groups/fun-groups'
import { CiclesLayout } from 'src/pages/cicles-page/cicles-layout'
import { CiclesListPage } from 'src/pages/cicles-page/layout/cicles-list-page/cicles-list-page'
import { CicleDetailsLayout } from 'src/pages/cicles-page/layout/cicle-details/layout/cicle-details-layout'
import { CicleDetails } from 'src/pages/cicles-page/layout/cicle-details/layout/cicle-details/cicle-details'
import { CicleInfo } from 'src/pages/cicles-page/layout/cicle-details/layout/cicle-info/cicle-info'
import { CicleParticipants } from 'src/pages/cicles-page/layout/cicle-details/layout/cicle-participants/cicle-participants'
import { CicleTeams } from 'src/pages/cicles-page/layout/cicle-details/layout/cicle-teams/cicle-teams'

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path={AppRoute.Home} element={<MainLayout />}>
				<Route path={AppRoute.Home} element={<HomePage />} />
				<Route path={AppRoute.Search} element={<SearchPage />} />

				<Route path={AppRoute.About} element={<AboutLayout />}>
					<Route index element={<AboutGeneral />} />
					<Route path={AppRoute.AboutEtnosport} element={<AboutEtnosportLayout />}>
						<Route index element={<EtnosportList />} />
						<Route path=':id' element={<EtnosportDetailsLayout />}>
							<Route index element={<EtnosportDetails />} />
							<Route path={AppRoute.EtnosportRules} element={<EtnosportRules />} />
							<Route path={AppRoute.EtnosportParticipants} element={<EtnosportParticipants />} />
							<Route path={AppRoute.EtnosportGroups} element={<EtnosportGroups />} />
							<Route path={AppRoute.EtnosportOrgs} element={<EtnosportOrgs />} />
							<Route path={AppRoute.EtnosportNews} element={<EtnosportNews />} />
							<Route path={AppRoute.EtnosportVideos} element={<EtnosportVideos />} />
							<Route path={AppRoute.EtnosportEvents} element={<EtnosportEvents />} />
						</Route>
					</Route>
					<Route path={AppRoute.AboutFun} element={<AboutFunLayout />}>
						<Route index element={<FunList />} />
						<Route path=':id' element={<FunDetailsLayout />}>
							<Route index element={<FunDetails />} />
							<Route path={AppRoute.FunRules} element={<FunRules />} />
							<Route path={AppRoute.FunParticipants} element={<FunParticipants />} />
							<Route path={AppRoute.FunGroups} element={<FunGroups />} />
							<Route path={AppRoute.FunOrgs} element={<FunOrgs />} />
							<Route path={AppRoute.FunNews} element={<FunNews />} />
							<Route path={AppRoute.FunVideos} element={<FunVideos />} />
							<Route path={AppRoute.FunEvents} element={<FunEvents />} />
						</Route>
					</Route>
				</Route>

				<Route path={AppRoute.Objects} element={<ObjectsLayout />}>
					<Route index element={<ObjectsList />} />
					<Route path=':id' element={<ObjectDetails />} />
				</Route>

				<Route path={AppRoute.News} element={<NewsLayout />}>
					<Route index element={<News />} />
					<Route path=':id' element={<NewsDetailsNew />} />
				</Route>

				<Route path={AppRoute.Videos} element={<VideosLayout />}>
					<Route index element={<Videos />} />
					<Route path=':id' element={<VideoDetails />} />
				</Route>

				<Route path={AppRoute.Events} element={<EventsLayout />}>
					<Route index element={<EventsListPage />} />
					<Route path=':id' element={<EventDetailsLayout />}>
						<Route index element={<EventDetails />} />
						<Route path={AppRoute.EventParticipants} element={<EventParticipants />} />
						<Route path={AppRoute.EventMaps} element={<EventMaps />} />
						<Route path={AppRoute.EventTeams} element={<EventTeams />} />
					</Route>
				</Route>

				<Route path={AppRoute.Cicles} element={<CiclesLayout />}>
					<Route index element={<CiclesListPage />} />
					<Route path=':id' element={<CicleDetailsLayout />}>
						<Route index element={<CicleDetails />} />
						<Route path={AppRoute.CiclesInfo} element={<CicleInfo />} />
						<Route path={AppRoute.CicleParticipants} element={<CicleParticipants />} />
						<Route path={AppRoute.CicleTeams} element={<CicleTeams />} />
					</Route>
				</Route>

				<Route path={AppRoute.Participants} element={<ParticipantLayout />}>
					<Route path=':id' element={<ParticipantDetailsLayout />}>
						<Route index element={<ParticipantDetails />} />
						<Route path={AppRoute.ParticipantEvents} element={<ParticipantEvents />} />
						<Route path={AppRoute.ParticipantGroups} element={<ParticipantGroups />} />
						<Route path={AppRoute.ParticipantEtnosport} element={<ParticipantEtnosport />} />
						<Route path={AppRoute.ParticipantEnjoy} element={<ParticipantEnjoy />} />
						<Route path={AppRoute.ParticipantGallery} element={<ParticipantGallery />} />
						<Route path={AppRoute.ParticipantArticles} element={<ParticipantArticles />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	)
}
