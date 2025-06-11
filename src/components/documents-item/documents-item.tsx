import { type FC } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'
import { type FileLinksItem } from 'src/types/document'

export type DocumentsItemProps = {
	title: string
	description?: string
	isMain?: boolean
	version?: string
	date: string
	author: string
	fileLinks: FileLinksItem[]
	className?: string
}

export const DocumentsItem: FC<DocumentsItemProps> = ({
	title,
	description,
	version,
	date,
	author,
	fileLinks,
	isMain,
	className,
}) => {
	return (
		<li className={cn(className, styles.documentsItem, { [styles.mainDocument]: isMain })}>
			{isMain ? <h3>{title}</h3> : <h4>{title}</h4>}
			{description && <p>{description}</p>}

			<div className={styles.footer}>
				<ul className={styles.downloadLinks}>
					{fileLinks?.map((item) => (
						<li key={item.id}>
							<a href='#' download>
								Скачать {item.type} ({item.size} Мб)
							</a>
						</li>
					))}
				</ul>

				<p>
					Версия <b>{version}</b>, загружена <b>{date}</b>, издан: <b>{author}</b>
				</p>
			</div>
		</li>
	)
}
