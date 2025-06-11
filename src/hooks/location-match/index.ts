import { type Location, matchRoutes, useLocation } from 'react-router-dom'

export const useLocationMatch = <T>(pathArr: string[]): [boolean, Location<T>] => {
	const location = useLocation()
	const resultMatchArr = pathArr.map((el) => ({ path: el }))
	return [!!matchRoutes(resultMatchArr, location), location]
}
