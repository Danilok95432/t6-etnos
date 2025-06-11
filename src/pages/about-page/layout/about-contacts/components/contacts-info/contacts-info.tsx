import { type FC } from 'react'

import { useGetAboutContactsQuery } from 'src/store/about/about.api'

import styles from './index.module.scss'

export const ContactsInfo: FC = () => {
	const { data: aboutContactsData } = useGetAboutContactsQuery(null)
	return (
		<div className={styles.infoBlock}>
			{aboutContactsData?.mailAddress && (
				<div className={styles.contactsBlock}>
					<h4>Почтовый адрес</h4>
					<p>{aboutContactsData.mailAddress}</p>
				</div>
			)}

			{aboutContactsData?.phone[0] && aboutContactsData.phone[0].phoneNumber.number !== '' && (
				<div className={styles.contactsBlock}>
					<h4>Телефон</h4>
					<p>{aboutContactsData.phone[0].contact}</p>
					<a href={`tel:${aboutContactsData.phone[0].phoneNumber.number}`}>
						{aboutContactsData.phone[0].phoneNumber.formatNumber}
					</a>
				</div>
			)}

			{aboutContactsData?.emails[0] && aboutContactsData.emails[0].email !== '' && (
				<div className={styles.contactsBlock}>
					<h4>Электронная почта</h4>
					<p>{aboutContactsData.emails[0].contact}</p>
					<a href={`mailto:${aboutContactsData.emails[0].email}`}>
						{aboutContactsData.emails[0].email}
					</a>
				</div>
			)}
		</div>
	)
}
