import { type FC, useEffect, useState } from 'react'
import { type SearchItem } from 'src/types/search'
import { SearchElement } from 'src/modules/search-module/components/search-element/search-element'
import { SearchCloseSvg } from 'src/UI/icons/searchCloseSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'

import styles from './index.module.scss'

type SearchModuleProps = {
	searchElements: SearchItem[]
	limit?: number
}

export const SearchModule: FC<SearchModuleProps> = ({ searchElements, limit = 3 }) => {
	const [isShowSearch, setIsShowSearch] = useState(false)
	const [isExpandedSearch, setIsExpandedSearch] = useState(false)

	const slicedSearchElements = searchElements.slice(
		0,
		isExpandedSearch ? searchElements.length : limit,
	)

	const onClickExpanded = () => {
		setIsExpandedSearch((prev) => !prev)
	}

	useEffect(() => {
		setIsShowSearch(!!searchElements?.length)
	}, [searchElements])

	return (
		<div className={styles.searchWrapper}>
			{isShowSearch && (
				<div className={styles.searchList}>
					<button
						className={styles.searchCloseBtn}
						type='button'
						onClick={() => setIsShowSearch(false)}
					>
						<SearchCloseSvg />
					</button>
					<h5>Результаты поиска</h5>
					{slicedSearchElements?.map((el) => <SearchElement key={el.id} {...el} />)}
					{searchElements?.length > limit && (
						<MainButton $variant='show' className={styles.showBtn} onClick={onClickExpanded}>
							{isExpandedSearch ? 'Свернуть' : 'Все результаты поиска'}
						</MainButton>
					)}
				</div>
			)}
		</div>
	)
}
