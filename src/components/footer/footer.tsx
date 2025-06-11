import { type FC } from 'react'
import { Link } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
import footerLogo from 'src/assets/img/footer-logo.svg'
import { AppRoute } from 'src/routes/main-routes/consts'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { SocialLinks } from '../social-links/social-links'

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerTop}>
					<img className={styles.footerLogo} src={footerLogo} alt='Логотип' />
					<FlexRow className={styles.footerTopLinks}>
						<Link to={AppRoute.Events}>События</Link>
						<Link to={AppRoute.Events}>Обратная связь</Link>
					</FlexRow>
				</FlexRow>
			</Container>
			<div className={styles.footerLine}></div>
			<Container>
				<address className={styles.footerContacts}>
					<ul className={styles.footerContactsColumns}>
						<li className={styles.footerContactsColumn}>
							<h6 className={styles.footerContactsTitle}>Телефон</h6>
							<a
								href='tel:+79999999999'
								className={styles.footerContactsLink}
								aria-label='Телефон'
								title='Телефон'
							>
								8 (999) 999-99-99
							</a>
						</li>
						<li className={styles.footerContactsColumn}>
							<h6 className={styles.footerContactsTitle}>Электронная почта</h6>
							<a
								href='mailto:npotau@npotau.ru'
								className={styles.footerContactsLink}
								aria-label='Почта'
								title='Почта'
							>
								npotau@npotau.ru
							</a>
						</li>
						<li className={styles.footerContactsColumn}>
							<h6 className={styles.footerContactsTitle}>Адрес</h6>
							<span>392003, г. Тамбов, б-р Энтузиастов, д. 2А, этаж 4</span>
						</li>
					</ul>

					<SocialLinks />
				</address>

				<div className={styles.footerCopyright}>
					<div className={styles.footerInfo}>
						<p className={styles.footerExtra}>
							© Атманов угол, <time dateTime='2024'>2024</time>
						</p>
						<p className={styles.footerSmallText}>
							Cвидетельство о&nbsp;регистрации средства массовой информации Эл &#8470;
							ФС77&nbsp;&mdash; 37229 от&nbsp;
							<time dateTime='14.08.2009'>14&nbsp;августа 2009&nbsp;г.</time> Выдано Федеральной
							службой по&nbsp;надзору в&nbsp;сфере связи, информационных технологий и&nbsp;массовых
							коммуникаций (Роскомнадзор).
						</p>
					</div>
					<p className={styles.footerDevInfo}>Разработано и построено в НПО ТАУ. Платформа Т-6.</p>
				</div>
			</Container>
		</footer>
	)
}
