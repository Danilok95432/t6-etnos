import cn from 'classnames'

import { MainInput } from 'src/UI/MainInput/MainInput'

import styles from './index.module.scss'
import { FC, useState } from 'react'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { MainSelect } from 'src/UI/MainSelect/MainSelect'

type FilterPanelProps = {
  options: {
    name?: string
    type?: string
    setSearchName: (arg0: string) => void
    setSearchType: (arg0: string) => void
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
            placeholder='поиск по названию группы...'
            value={options.name}
            onChange={(e) => options.setSearchName(e.target.value)}
            required
          />
        </div>
        <div className={cn(styles.searchWrapper, styles.shortWrapper)}>
          <MainSelect
            wrapperClassName={cn(styles.searchSelect)}
            name='type'
            items={[{label: 'категория группы', value: '0'}]}
            value={options.type}
            onChange={(e) => options.setSearchType(e.target.value)}
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
