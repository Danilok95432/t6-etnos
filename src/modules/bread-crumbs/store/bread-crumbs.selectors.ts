import { type State } from 'src/types/state'

import { NameSpace } from 'src/helpers/consts'

export const getAdditionalCrumbs = (state: State) => state[NameSpace.BreadCrumbs].additionalCrumbs
