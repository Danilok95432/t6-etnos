import { type FC, useEffect, useState } from 'react'
import { type NavigationItem } from 'src/types/navigation'

import { Link, useLocation } from 'react-router-dom'

import { useAppSelector } from 'src/hooks/store'
import { getAdditionalCrumbs } from 'src/modules/bread-crumbs/store/bread-crumbs.selectors'

import { AppRoute } from 'src/routes/main-routes/consts'

import styles from './index.module.scss'

type BreadCrumbsProps = {
  crumbsLinksMap: NavigationItem[]
  innerElementCrumbs?: boolean
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({
  crumbsLinksMap,
  innerElementCrumbs = false,
}) => {
  /*
	const { pathname } = useLocation()

	const [pathNames, setPathNames] = useState<string[]>([''])

	const additionalCrumbs = useAppSelector(getAdditionalCrumbs)
	const crumbsLinksArr = crumbsLinksMap.map((el) => el.link)

	const defineLinkTitle = (link: string) => {
		const searchEl = crumbsLinksMap.find((el) => el.link === link)
		if (searchEl?.title) {
			return searchEl?.title
		}
	}

	useEffect(() => {
		let filteredPathnames: string[]
		if (innerElementCrumbs) {
			filteredPathnames = crumbsLinksArr
		}
		else filteredPathnames = pathname.split('/').filter((el) => crumbsLinksArr.includes(el))
		setPathNames(() => {
			if (additionalCrumbs) {
				return [...filteredPathnames, additionalCrumbs]
			}
			return [...filteredPathnames]
		})
	}, [pathname, additionalCrumbs])
	*/
  return (
		<>
		</>
    /*
				<ul className={styles.breadCrumbsList}>
			<li>
				<Link to={AppRoute.Home}> Главная </Link> <span>/</span>
			</li>

			{pathNames?.map((pathEl, idx) => {
				if (pathNames.length - 1 === idx) {
					return (
						<li key={pathEl}>
							<span>{additionalCrumbs ?? defineLinkTitle(pathEl)}</span>
						</li>
					)
				}

				if (pathEl === 'about-etnosport' || pathEl === 'about-fun') {
					return (
						<li key={pathEl}>
							<Link to={`${pathEl}`}>{defineLinkTitle(pathEl)}</Link>
							<span> /</span>
						</li>
					)
				}

				if (pathEl === 'event-program') {
					return (
						<li key={pathEl}>
							<Link to={`${pathEl}`}>{defineLinkTitle(pathEl)}</Link>
							<span> /</span>
						</li>
					)
				}

				return (
					<li key={pathEl} id={pathEl}>
						<Link to={`/${pathEl}`}>{defineLinkTitle(pathEl)}</Link>
						<span> /</span>
					</li>
				)
			})}
		</ul>
			*/
	)
}

