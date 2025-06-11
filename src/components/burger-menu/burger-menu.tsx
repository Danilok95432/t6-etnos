import { type FC, useEffect, useState } from 'react'
import { type NavigationItem } from 'src/types/navigation'
import cn from 'classnames'

import { NavLink } from 'react-router-dom'
import { setActive } from 'src/helpers/utils'

import styles from './index.module.scss'

type BurgerMenuProps = {
	menuItems: NavigationItem[]
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ menuItems }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<div className={styles.burgerMenu}>
			<div className={styles.burgerIcon} onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<nav className={cn(styles.navMenu, { [styles._openMenu]: isOpen })}>
				<div className={cn(styles.burgerIcon, styles._openIcon)} onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul>
					{menuItems.map((menuEl) => (
						<li className={styles.menuItem} key={menuEl.link}>
							<NavLink
								className={({ isActive }) => setActive(isActive, styles.activeLink)}
								to={menuEl.link}
								onClick={() => toggleMenu()}
							>
								{menuEl.title}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
