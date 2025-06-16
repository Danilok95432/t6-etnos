import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'
import { Container } from 'src/UI/Container/Container'
import { PersonIconSvg } from 'src/UI/icons/personIconSVG'
import { NavBanner } from '../main-navigation/components/nav-banner/nav-banner'

import mainLogo from 'src/assets/img/logo-etno.svg'

import styles from './index.module.scss'
import { useActions } from 'src/hooks/actions/actions'
import { AuthModal } from 'src/modals/auth-modal/auth-modal'

export const Header = () => {
	const { openModal } = useActions()
	const openAuthModal = () => {
		openModal(<AuthModal />)
	}
	return (
		<header className={styles.mainNav}>
			<div className={styles.topMainNavWrapper}>
				<Container className={styles.topMainNav}>
					<Link
						to={AppRoute.Home}
						className={styles.logoWrapper}
						aria-label='Главная'
						title='Главная'
					>
						<img src={mainLogo} alt='logo' width={282} height={100} />
					</Link>
					<NavBanner />
					<button className={styles.personMenu} aria-label='Профиль' title='Профиль' onClick={openAuthModal}>
						<PersonIconSvg />
					</button>
				</Container>
			</div>
		</header>
	)
}
