import { type FC } from 'react'

import { DocumentsItem } from '../documents-item/documents-item'
import { type Document } from 'src/types/document'
import styles from './index.module.scss'

export type DocumentsListProps = {
	listTitle: string
	data: Document[]
	className?: string
}

export const DocumentsList: FC<DocumentsListProps> = ({ listTitle, data, className }) => {
	return (
		<div className={className}>
			<h3 className={styles.listTitle}>{listTitle}</h3>

			<ul className={styles.list}>
				{data.map((item) => (
					<DocumentsItem key={item.id} {...item} />
				))}
			</ul>
		</div>
	)
}
