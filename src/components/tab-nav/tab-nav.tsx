import React, { type FC, useEffect, useState } from 'react'
import { type TabNavigationItem } from 'src/types/navigation'
import cn from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

type TabNavProps = {
	navItems: TabNavigationItem[] | undefined
	isTitle?: boolean
	className?: string
	customLocations?: string[]
	activeClassName?: string
}
export const TabNav: FC<TabNavProps> = ({
	navItems,
	isTitle = false,
	className,
	activeClassName,
}) => {
	if (!navItems?.length) return

	const location = useLocation()

	const [activeTitle, setActiveTitle] = useState<string>(navItems[0].title)
	const setActive = ({ isActive }: { isActive: boolean }) =>
		isActive ? `${activeClassName ?? styles.activeLink}` : ''

	useEffect(() => {
		if (isTitle) {
			const currentLocations = [...location.pathname.split('/')]
			const navLinks = navItems.reduce((acc: string[], el) => {
				if (el.link) {
					acc.push(el.link)
				}
				return acc
			}, [])

			currentLocations.some((el) => {
				if (navLinks.includes(el)) {
					const currentNavItem = navItems.find((item) => item.link === el) ?? navItems[0]
					setActiveTitle(currentNavItem.title)
					return true
				}
				setActiveTitle(navItems[0].title)
				return false
			})
		}
	}, [location.pathname])

	return (
		<nav className={cn(styles.tabNavWrapper, className)}>
			{isTitle && <h5>{activeTitle}</h5>}
			<ul className={styles.tabNav}>
				{navItems?.map((navItem) => (
					<li key={navItem.title}>
						<NavLink className={setActive} to={navItem.link} end={navItem.exact}>
							{navItem.title}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
