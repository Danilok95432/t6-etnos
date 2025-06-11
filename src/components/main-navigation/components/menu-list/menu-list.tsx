import { NavLink } from 'react-router-dom'
import { MenuItems } from 'src/components/main-navigation/consts'

import styles from './index.module.scss'

export const MenuList = () => {
	return (
		<ul className={styles.menuList}>
			{MenuItems.map((menuEl) => (
				<li className={styles.menuItem} key={menuEl.link}>
					<NavLink to={menuEl.link}>{menuEl.title}</NavLink>
				</li>
			))}
		</ul>
	)
}
