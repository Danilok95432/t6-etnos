import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import styles from './index.module.scss'
import { useGetNewsMonthsQuery } from 'src/store/news/news.api'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { NewsCard } from 'src/components/news-card/news-card'

export const TeamNews = () => {
  const { data: newsList } = useGetNewsMonthsQuery({
    date: '',
    category: '',
  })
  const breakpoint = useBreakPoint()
  return(
    <div className={styles.groupNewsPage}>
      <h2>Новости</h2>
      {newsList?.length ? (
						breakpoint === 'S' ? (
							<MobileList items={newsList} renderItem={NewsCard} classListItems={styles.newsList} />
						) : (
							<div className={styles.newsList}>
								{newsList.map((newsEl) => (
									<NewsCard key={newsEl.id} {...newsEl} />
								))}
							</div>
						)
					) : (
						<p className={styles.newsAbsence}>
							В выбранном вами месяце нет ни одной новости. Пожалуйста, выберите другой месяц.
						</p>
					)}
    </div>
  )
}