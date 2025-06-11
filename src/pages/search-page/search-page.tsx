import { Helmet } from 'react-helmet-async'
import cn from 'classnames'
import React, { useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { TagsList } from 'src/pages/search-page/consts'
import { useGetSearchedQuery } from 'src/store/search/search.api'
import { MainInput } from 'src/UI/MainInput/MainInput'
import { useDebounce } from 'src/hooks/debounce/debounce'
import { SearchModule } from 'src/modules/search-module/search-module'

import styles from './index.module.scss'

export const SearchPage = () => {
	const [searchVal, setSearchVal] = useState<string>('')
	const debouncedSearch = useDebounce(searchVal)

	const { data: searchedData } = useGetSearchedQuery({
		search: debouncedSearch,
		limit: 0,
	})

	const setTagOnSearch = (e: React.MouseEvent<HTMLLIElement>) => {
		setSearchVal(e.currentTarget.textContent ?? '')
	}

	return (
		<Container className={styles.searchContainer}>
			<Helmet>
				<title>Поиск</title>
			</Helmet>
			<div className={styles.searchBox}>
				<div className={styles.searchWrapper}>
					<MainInput
						className={cn(styles.searchInput, { [styles._activeSearch]: searchVal })}
						name='search'
						placeholder='Событие, объект, место'
						value={searchVal}
						onChange={(e) => setSearchVal(e.target.value)}
						required
					/>
				</div>
				<SearchModule searchElements={searchedData ?? []} />
				<ul className={styles.tagsList}>
					{TagsList?.map((tag) => (
						<li key={tag} onClick={setTagOnSearch}>
							{tag}
						</li>
					))}
				</ul>
			</div>
		</Container>
	)
}
