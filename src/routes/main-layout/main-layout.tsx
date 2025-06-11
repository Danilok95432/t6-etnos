import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { MainNavigation } from 'src/components/main-navigation/main-navigation'
import { Footer } from 'src/components/footer/footer'
import { Header } from 'src/components/header/Header'

export const MainLayout: FC = () => {
	return (
		<>
			<Header />
			<MainNavigation />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
