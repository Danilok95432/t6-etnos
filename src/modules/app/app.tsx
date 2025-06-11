import { type FC } from 'react'

import { Route, Routes } from 'react-router-dom'

import { NotFound } from 'src/pages/not-found/not-found'
import { MainRoutes } from 'src/routes/main-routes/main-routes'

export const App: FC = () => {
	return (
		<Routes>
			<Route path='/*' element={<MainRoutes />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
export default App
