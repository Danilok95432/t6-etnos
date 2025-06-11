import { type FC } from 'react'

import { useGetAboutGeneralQuery } from 'src/store/about/about.api'

import styles from './index.module.scss'

export const DescSection: FC = () => {
	const { data: aboutPageData } = useGetAboutGeneralQuery(null)
	if (!aboutPageData) return null

	return (
		<section className={styles.descSection}>
			{aboutPageData?.descs && (
				<div
					className={styles.mainDescs}
					dangerouslySetInnerHTML={{ __html: aboutPageData.descs }}
				/>
			)}
		</section>
	)
}
