import { type FC } from 'react'

import { PageContent } from 'src/components/page-content/page-content'
import { ObjectHeader } from 'src/pages/objects-page/layout/object-details/components/object-header/object-header'
import { ObjDetailsGallery } from 'src/pages/objects-page/layout/object-details/components/obj-details-gallery/obj-details-gallery'
import { ObjDetailsNews } from 'src/pages/objects-page/layout/object-details/components/obj-details-news/obj-details-news'
import { ObjDetailsMap } from 'src/pages/objects-page/layout/object-details/components/obj-details-map/obj-details-map'
import { ObjDetailsVideos } from 'src/pages/objects-page/layout/object-details/components/obj-details-videos/obj-details-videos'
import { ObjDetailsEvents } from 'src/pages/objects-page/layout/object-details/components/obj-details-events/obj-details-events'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { ObjDetailsDescs } from './components/obj-details-descs/obj-details-descs'
import { ObjDetailsOrg } from './components/obj-details-org/obj-details-org'

export const ObjectDetails: FC = () => {
	return (
		<PageContent className={styles.objDetailsPage}>
			<Container>
				<ObjectHeader />
				<ObjDetailsGallery />
				<ObjDetailsOrg />
				<ObjDetailsDescs />
				<ObjDetailsEvents />
				<ObjDetailsNews />
				<ObjDetailsVideos />
				<ObjDetailsMap />
			</Container>
		</PageContent>
	)
}
