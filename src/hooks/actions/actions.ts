import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { breadCrumbsActions } from 'src/modules/bread-crumbs/store/bread-crumbs.slice'

const actions = {
	...breadCrumbsActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
