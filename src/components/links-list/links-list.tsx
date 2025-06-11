import { type FC } from 'react'
import { type LinkItem } from 'src/types/global'

import cn from 'classnames'

import { DOCIconSvg } from 'src/UI/icons/docIconSVG'
import { PDFIconSvg } from 'src/UI/icons/pdfIconSVG'

import styles from './index.module.scss'

type LinksListProps = {
	title?: string
	className?: string
	dataList?: LinkItem[]
}
export const LinksList: FC<LinksListProps> = ({ dataList, title, className }) => {
	if (!dataList?.length) return null
	return (
		<div className={cn(styles.linksListWrapper, className)}>
			{title && <h4>{title}</h4>}

			{!!dataList?.length && (
				<ul>
					{dataList.map((item) => (
						<li key={item.id}>
							{item.type && <span>{item.type === 'doc' ? <DOCIconSvg /> : <PDFIconSvg />}</span>}
							<div>
								<a href={item.link} download>
									{item.titleLink}
								</a>
								<p className={styles.linksDesc}>
									{Array.isArray(item?.label) ? (
										<>
											{item?.label?.map((labelEl, idx, labelArr) => (
												<span key={idx}>
													{labelEl}
													{labelArr.length - 1 === idx ? '' : ', '}
												</span>
											))}
										</>
									) : (
										<span>{item?.label}</span>
									)}
								</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
