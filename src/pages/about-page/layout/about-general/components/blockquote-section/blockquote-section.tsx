import { type FC } from 'react'

import { useGetAboutGeneralQuery } from 'src/store/about/about.api'
import { RenderedArray } from 'src/components/rendered-array/rendered-array'

import styles from './index.module.scss'

export const BlockquoteSection: FC = () => {
	const { data: aboutPageData } = useGetAboutGeneralQuery(null)
	if (!aboutPageData) return null

	return (
		<section className={styles.blockquoteSection}>
			<div className={styles.blockquoteBody}>
				<RenderedArray strArray={aboutPageData.mainDescs} asStr='p' as='blockquote' />
				<span className={styles.blockquoteCaption}>{aboutPageData.caption}</span>
			</div>
		</section>
	)
}
