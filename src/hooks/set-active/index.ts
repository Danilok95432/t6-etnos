type SetActiveFn = (isActive: boolean, activeStyle: string) => string

export const useSetActive = (): SetActiveFn => {
	return (isActive, activeStyle) => (isActive ? activeStyle : '')
}
