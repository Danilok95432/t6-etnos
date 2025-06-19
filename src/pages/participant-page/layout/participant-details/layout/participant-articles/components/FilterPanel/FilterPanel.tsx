import cn from 'classnames'

import { MainInput } from 'src/UI/MainInput/MainInput'

import styles from './index.module.scss'
import { FC, useState } from 'react'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { MainSelect } from 'src/UI/MainSelect/MainSelect'

type FilterPanelProps = {
  options: {
    name?: string
    rank?: string
    category?: string
    setSearchName: (arg0: string) => void
    setSearchRank: (arg0: string) => void
    setSearchCategory: (arg0: string) => void
  }
}

export const FilterPanel:FC<FilterPanelProps> = ({options}) => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <MainInput
            className={cn(styles.searchInput, { [styles._activeSearch]: options.name })}
            name='search'
            placeholder='поиск по названию...'
            value={options.name}
            onChange={(e) => options.setSearchName(e.target.value)}
            required
          />
        </div>
        <div className={cn(styles.searchWrapper, styles.shortWrapper)}>
          <MainSelect
            wrapperClassName={cn(styles.searchSelect)}
            name='rank'
            items={[{label: 'порядок показа', value: '0'}]}
            value={options.rank}
            onChange={(e) => options.setSearchRank(e.target.value)}
            required
          />
        </div>
        <div className={cn(styles.searchWrapper, styles.shortWrapper)}>
          <MainSelect
            wrapperClassName={cn(styles.searchSelect)}
            name='category'
            items={[{label: 'категория', value: '0'}]}
            value={options.category}
            onChange={(e) => options.setSearchCategory(e.target.value)}
            required
          />
        </div>
        <MainButton>
          Найти
        </MainButton>
      </div>
    </div>
  )
}
