import React, { type FC } from 'react'
import { Container } from 'src/UI/Container/Container'
import { BreadCrumbs } from 'src/modules/bread-crumbs/bread-crumbs'
import { Outlet } from 'react-router-dom'

export const NewsLayout: FC = () => {
	return (
		<>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Все новости',
							link: 'news',
						},
					]}
				/>
			</Container>
			<Outlet />
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						{
							title: 'Все новости',
							link: 'news',
						},
					]}
				/>
			</Container>
		</>
	)
}
