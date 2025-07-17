import cn from 'classnames'

import { MainInput } from 'src/UI/MainInput/MainInput'

import styles from './index.module.scss'
import { FC, useState } from 'react'
import { useDebounce } from 'src/hooks/debounce/debounce'
import { SwitcherView } from 'src/components/switcherView/switcherView'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { MainSelect } from 'src/UI/MainSelect/MainSelect'
import { FiltersIconSVG } from 'src/UI/icons/filtersIconSVG'

type FilterPanelProps = {
  options: {
    name?: string
    region?: string
    view?: string
    type?: string
    setSearchName: (arg0: string) => void
    setSearchRegion: (arg0: string) => void
    setSearchType: (arg0: string) => void
    setView: (arg0: string) => void
  }
  isSingle?: number
}

export const FilterPanel:FC<FilterPanelProps> = ({ options, isSingle = 0 }) => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <MainInput
            className={cn(styles.searchInput, { [styles._activeSearch]: options.name })}
            name='search'
            placeholder={isSingle === 0 ? 'поиск по имени участника...' : 'поиск по названию группы...'}
            value={options.name}
            onChange={(e) => options.setSearchName(e.target.value)}
            required
          />
        </div>
        <div className={cn(styles.searchWrapper, styles.hiddenMobile)}>
          <MainInput
            className={cn(styles.searchInput, { [styles._activeSearch]: options.region })}
            name='searchRegion'
            placeholder='поиск по региону...'
            value={options.region}
            onChange={(e) => options.setSearchRegion(e.target.value)}
            required
          />
        </div>
        <MainButton className={styles.hiddenMobile}>
          Найти
        </MainButton>
        <MainButton className={styles.mobileFilters}>
          <FiltersIconSVG />
        </MainButton>
      </div>
      <SwitcherView view={options.view} switchView={options.setView} className={styles.hiddenMobile} />
    </div>
  )
}
