import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { breadCrumbsActions } from 'src/modules/bread-crumbs/store/bread-crumbs.slice'
import { modalActions } from 'src/modules/modal/store/modal.slice'

const actions = {
	...breadCrumbsActions,
	...modalActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
