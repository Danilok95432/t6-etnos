import { useActions } from 'src/hooks/actions/actions'
import { useEffect } from 'react'

export const useAdditionalCrumbs = (additionalCrumb: string | undefined) => {
	const { setAdditionalCrumbs } = useActions()

	useEffect(() => {
		if (additionalCrumb) {
			setAdditionalCrumbs(additionalCrumb)
		}
		return () => {
			setAdditionalCrumbs(null)
		}
	}, [additionalCrumb])
}
