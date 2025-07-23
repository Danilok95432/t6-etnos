import { type FC } from 'react'
import { Link } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
// import footerLogo from 'src/assets/img/footer-logo.svg'
import { AppRoute } from 'src/routes/main-routes/consts'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { SocialLinks } from '../social-links/social-links'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { VkSocialSvg } from 'src/UI/icons/vkSocialSVG'
import { TgEventIconSVG } from 'src/UI/icons/tgEventIconSVG'
import { TelegramSocialSvg } from 'src/UI/icons/telegramSocialSVG'

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerRow}>
					<p>Разработано и построено в НПО ТАУ</p>
					<FlexRow className={styles.socialsRow}>
						<Link to={`https://vk.com/rustradgames`}>
							<button>
								<VkSocialSvg />
							</button>
						</Link>
						<button>
							<TelegramSocialSvg />
						</button>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
