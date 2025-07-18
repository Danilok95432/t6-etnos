import { type FC } from 'react'

import { Outlet } from 'react-router-dom'
import { MainNavigation } from 'src/components/main-navigation/main-navigation'
import { Footer } from 'src/components/footer/footer'
// import { Header } from 'src/components/header/Header'
import { HeaderLending } from 'src/components/header-atm/header-lending'

export const MainLayout: FC = () => {
	return (
		<>
			{ /* <Header /> */ }
			<HeaderLending />
			<MainNavigation />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
