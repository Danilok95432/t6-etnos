import { type FC } from 'react'

import { Link } from 'react-router-dom'
import { Container } from 'src/UI/Container/Container'
import { AppRoute } from 'src/routes/main-routes/consts'
import { MenuList } from 'src/components/main-navigation/components/menu-list/menu-list'
import { BurgerMenu } from 'src/components/burger-menu/burger-menu'
import { MenuItems } from 'src/components/main-navigation/consts'

import { SearchBtnIconSvg } from 'src/UI/icons/searchBtnIconSVG'
import styles from './index.module.scss'

export const MainNavigation: FC = () => {
	return (
		<nav className={styles.menuWrapper}>
			<Container className={styles.menuContainer}>
				<BurgerMenu menuItems={MenuItems} />
				<MenuList />
				<Link className={styles.searchLink} to={AppRoute.Search}>
					<SearchBtnIconSvg />
				</Link>
			</Container>
		</nav>
	)
}
