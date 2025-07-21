import { NavLink } from 'react-router-dom'
import { navigationElements } from 'src/components/main-navigation/consts'

import styles from './index.module.scss'

export const MenuList = () => {
  return (
    <ul className={styles.navWrapper}>
      {navigationElements.map((el, index) => (
        <NavLink key={index} className={styles.navEl} to={el.link}>
          <li>{el.title}</li>
        </NavLink>
      ))}
    </ul>
  )
}

