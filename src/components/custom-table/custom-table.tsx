import React, { type FC, type ReactNode } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'

export type TableCells = Array<string | ReactNode>

type CustomTableProps = {
	colTitles?: ReactNode[]
	cellsData: TableCells[]
}

export const CustomTable: FC<CustomTableProps & React.HTMLAttributes<HTMLTableElement>> = ({
	colTitles,
	cellsData,
	className,
	...props
}) => {
	return (
		<table {...props} className={cn(styles.customTable, className)}>
			{!!colTitles && (
				<thead>
					<tr>
						{colTitles.map((title, idx) => (
							<th key={idx}>{title}</th>
						))}
					</tr>
				</thead>
			)}

			<tbody>
				{cellsData?.map((row, rowIdx) => (
					<tr key={rowIdx} data-idx={rowIdx + 1}>
						{row.map((cell, cellIdx) => (
							<td key={cellIdx}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
