import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { PosterSection } from 'src/pages/home-page/components/poster-section/poster-section'
import { ObjectsSection } from 'src/pages/home-page/components/objects-section/objects-section'
import { EventsSection } from 'src/pages/home-page/components/events-section/events-section'
import { ObjectPreviewSection } from 'src/pages/home-page/components/object-preview-section/object-preview-section'
import { VideotapeSection } from 'src/pages/home-page/components/videotape-section/videotape-section'
import { NewsSection } from 'src/pages/home-page/components/news-section/news-section'
import { PartnersSection } from 'src/pages/home-page/components/partners-section/partners-section'
import { FaqSection } from 'src/pages/home-page/components/faq-section/faq-section'

import styles from './index.module.scss'

export const HomePage: FC = () => {
	return (
		<div className={styles.homePage}>
			<Helmet>
				<title>Главная</title>
			</Helmet>
			<PosterSection />
			<ObjectsSection />
			<EventsSection />
			<NewsSection />
			<VideotapeSection />
			<PartnersSection />
			<FaqSection />
			<ObjectPreviewSection />
		</div>
	)
}
