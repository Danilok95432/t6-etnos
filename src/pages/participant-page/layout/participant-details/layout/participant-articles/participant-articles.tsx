import { useState } from 'react'
import { FilterPanel } from './components/FilterPanel/FilterPanel'
import styles from './index.module.scss'

export const ParticipantArticles = () => {

  const articles = [
    {
      id: '1',
      category: 'Монография',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet',
      type: 'pdf-файл, 68.5 Кбайт',
      publish: '24.05.2012, Москва,  Детгиз / Мурзилка',
      date: '24.02.2024',
      coAuthor: 'Нет'
    },
    {
      id: '2',
      category: 'Монография',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet',
      type: 'pdf-файл, 68.5 Кбайт',
      publish: '24.05.2012, Москва,  Детгиз / Мурзилка',
      date: '24.02.2024',
      coAuthor: 'Нет'
    }
  ]

  const [searchName, setSearchName] = useState<string>('')
  const [searchRank, setSearchRank] = useState<string>('0')
  const [searchCategory, setSearchCategory] = useState<string>('0')

  const options = {
    name: searchName,
    setSearchName: setSearchName,
    rank: searchRank,
    setSearchRank: setSearchRank,
    category: searchCategory,
    setSearchCategory: setSearchCategory,
  }

  return (
    <div className={styles.articlesSection}>
      <h2>Авторский раздел</h2>
      <div className={styles.headGroups}>
        <FilterPanel options={options} />
      </div>
      <p className={styles.numberOfFilter}>Всего материалов по выбранным фильтрам: 15</p>
      {
        articles && articles.length > 1 ?
        <ul className={styles.articlesList}>
          {
            articles.map((article) => {
              return(
                <li className={styles.articleElem} key={article.id}>
                  <p>{article.category + ': ' + article.title}</p>
                  <div className={styles.additionalInfo}>
                    <span>{article.type}</span>
                    <span>{'Публикация: ' + article.publish}</span>
                    <span>{'Размещен на сайте: ' + article.date}</span>
                    <span>{'Соавторы: ' + article.coAuthor}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
        :
        <p>Не найдено материалов</p>
      }
    </div>
  )
}
