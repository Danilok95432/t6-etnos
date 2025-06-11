import { type FC } from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
import { BreadCrumbs } from 'src/modules/bread-crumbs/bread-crumbs'

export const ObjectsLayout: FC = () => {
	return (
		<>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Объекты',
							link: 'objects-list',
						},
					]}
				/>
			</Container>
			<Outlet />
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Объекты',
							link: 'objects-list',
						},
					]}
				/>
			</Container>
		</>
	)
}
