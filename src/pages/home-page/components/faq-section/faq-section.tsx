import { type FC } from 'react'

import { Container } from 'src/UI/Container/Container'
import { useGetHomeFaqQuery } from 'src/store/home/home.api'

import styles from './index.module.scss'
import { AccordionItem } from 'src/components/accordion-item/accordion-item'
import { HomeFaqArrow } from 'src/UI/icons/homeFaqArrow'

export const FaqSection: FC = () => {
	const { data: faqList } = useGetHomeFaqQuery(null)

	return (
		<section className={styles.faqSection}>
			<Container>
				<h2>Часто задаваемые вопросы</h2>
				<div className={styles.homeFaqList}>
					{faqList?.map((faqEl) => (
						<AccordionItem
							className={styles.faqItem}
							trigger={faqEl.title}
							customArrow={<HomeFaqArrow />}
							content={faqEl.content}
							key={faqEl.id}
						/>
					))}
				</div>
			</Container>
		</section>
	)
}
