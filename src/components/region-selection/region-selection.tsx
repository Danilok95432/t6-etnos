import { type FC, useState } from 'react'
import cnBind from 'classnames/bind'

import { RegionalBranches } from 'src/components/region-selection/consts'
import { SelectArrowSvg } from 'src/UI/icons/selectArrowSVG'

import styles from './index.module.scss'
import cn from 'classnames'

type RegionSelectionProps = {
	className?: string
}
export const RegionSelection: FC<RegionSelectionProps> = ({ className }) => {
	const [activeRegionIdx, setActiveRegionIdx] = useState<number>(0)
	const [isOpenRegions, setIsOpenRegions] = useState<boolean>(false)

	const cx = cnBind.bind(styles)

	const handleSelectRegion = (idx: number) => {
		setActiveRegionIdx(idx)
		setIsOpenRegions(false)
	}

	return (
		<div className={cn(styles.regSelWrapper, className)}>
			<button
				className={cx(styles.regPreviewBtn, { _active: isOpenRegions })}
				onClick={() => setIsOpenRegions(!isOpenRegions)}
				type='button'
			>
				{RegionalBranches[activeRegionIdx]}
				<SelectArrowSvg />
			</button>

			{isOpenRegions && (
				<ul className={styles.regionsList}>
					{RegionalBranches.map((regionEl, idx) => (
						<li
							className={cn({ [styles.activeRegions]: idx === activeRegionIdx })}
							key={idx}
							onClick={() => handleSelectRegion(idx)}
						>
							{regionEl}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
