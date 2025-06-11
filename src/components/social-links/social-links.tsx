import { type FC } from 'react'

import cn from 'classnames'

import { VkSocialSvg } from 'src/UI/icons/vkSocialSVG'
import { TelegramSocialSvg } from 'src/UI/icons/telegramSocialSVG'
import { RutubeSocialSvg } from 'src/UI/icons/rutubeSocialSVG'

import styles from './index.module.scss'

type SocialLinksProps = {
	className?: string
}
export const SocialLinks: FC<SocialLinksProps> = ({ className }) => {
	return (
		<ul className={cn(styles.socialLinks, className)}>
			<li>
				<a href='#'>
					<VkSocialSvg />
				</a>
			</li>
			<li>
				<a href='#'>
					<TelegramSocialSvg />
				</a>
			</li>
			<li>
				<a href='#'>
					<RutubeSocialSvg />
				</a>
			</li>
		</ul>
	)
}
