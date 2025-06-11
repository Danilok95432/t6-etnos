import cn from 'classnames'

import { ListPropgramSVG } from 'src/UI/icons/listProgramSVG'
import { TabProgramSVG } from 'src/UI/icons/tabProgramSVG'

import styles from './index.module.scss'
import { FC } from 'react'

type SwitcherViewProps = {
  view?: string
  switchView: (arg0: string) => void
}

export const SwitcherView:FC<SwitcherViewProps> = ({view, switchView}) => {
  return(
    <div className={styles.switcher}>
      <button className={cn(styles.switchButton, styles.listView, { [styles.active]: view === 'list' })} onClick={() => switchView('list')}>
        <ListPropgramSVG color={view === 'list' ?  '#000' : '#B0AEB9'} />
      </button>
      <button className={cn(styles.switchButton, styles.tabView, { [styles.active]: view === 'tab' })} onClick={() => switchView('tab')}>
        <TabProgramSVG color={view === 'tab' ?  '#000' : '#B0AEB9'} />
      </button>
    </div>
  )
}