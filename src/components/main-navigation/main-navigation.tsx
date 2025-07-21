import { type FC } from 'react'

import { Link } from 'react-router-dom'
import { Container } from 'src/UI/Container/Container'
import { AppRoute } from 'src/routes/main-routes/consts'
import { MenuList } from 'src/components/main-navigation/components/menu-list/menu-list'
import { BurgerMenu } from 'src/components/burger-menu/burger-menu'
import { navigationElements } from 'src/components/main-navigation/consts'

import { SearchBtnIconSvg } from 'src/UI/icons/searchBtnIconSVG'
import styles from './index.module.scss'
import { PersonIconSvg } from 'src/UI/icons/personIconSVG'
import { AuthModal } from 'src/modals/auth-modal/auth-modal'
import { useActions } from 'src/hooks/actions/actions'

export const MainNavigation: FC = () => {
	const { openModal } = useActions()
	return (
		<nav className={styles.menuWrapper}>
			<Container className={styles.menuContainer}>
				<BurgerMenu menuItems={navigationElements} />
				<MenuList />
				<button className={styles.enterLK} onClick={() => openModal(<AuthModal />)}>
					<div className={styles.vector}>
						<PersonIconSvg color='#CC1746' />
					</div>
				</button>
				{
					/* 
					<Link className={styles.searchLink} to={AppRoute.Search}>
						<SearchBtnIconSvg />
					</Link>
					*/
				}
			</Container>
		</nav>
	)
}
