import { type FC } from 'react'

import { Helmet } from 'react-helmet-async'

import { PageContent } from 'src/components/page-content/page-content'
import { useGetObjectsInfoQuery } from 'src/store/objects/objects.api'
import { ObjectCard } from 'src/components/object-card/object-card'

import styles from './index.module.scss'
import { CustomText } from 'src/components/custom-text/custom-text'
import { Container } from 'src/UI/Container/Container'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { MobileList } from 'src/components/mobile-list/mobile-list'

export const ObjectsList: FC = () => {
	const { data: objectsInfo } = useGetObjectsInfoQuery(null)
	const breakpoint = useBreakPoint()
	return (
		<PageContent className={styles.objectsListPage}>
			<Helmet>
				<title>Объекты сообщества</title>
			</Helmet>
			<Container>
				<h2>Объекты сообщества</h2>
				<CustomText $fontSize='20px' $lineHeight='1.25' $margin='0 0 20px 0'>
					{objectsInfo?.description}
				</CustomText>
				{breakpoint === 'S' && objectsInfo?.objects ? (
					<MobileList
						items={objectsInfo.objects}
						renderItem={ObjectCard}
						classListItems={styles.objectsList}
					/>
				) : (
					<div className={styles.objectsList}>
						{objectsInfo?.objects?.map((objEL) => <ObjectCard key={objEL.id} {...objEL} />)}
					</div>
				)}
			</Container>
		</PageContent>
	)
}
