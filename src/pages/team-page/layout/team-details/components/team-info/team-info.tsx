import { Link, useParams } from 'react-router-dom'

import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import { InfoRow } from 'src/UI/InfoRow/InfoRow'
import { CustomText } from 'src/components/custom-text/custom-text'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { PlaceIconSVG } from 'src/UI/icons/placeIconSVG'
import { SiteIconSVG } from 'src/UI/icons/siteIconSVG'
import { PhoneEventIconSVG } from 'src/UI/icons/phoneEventIconSVG'
import { MailEventIconSVG } from 'src/UI/icons/mailEventIconSVG'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useActions } from 'src/hooks/actions/actions'
import { BirthdayParticipantSVG } from 'src/UI/icons/birthdayParticipantSVG'
import { GenderParticipantSVG } from 'src/UI/icons/genderParticipantSVG'
import { CategoryInfoSVG } from 'src/UI/icons/categoryInfoSVG'
import { SectionsInfoSVG } from 'src/UI/icons/SectionsInfoSVG'
import { RequestGroupModal } from 'src/modals/request-group-modal/request-group-modal'

export const TeamInfo = () => {
  const { id = '' } = useParams()
  const { data: eventData } = useGetEventByIdQuery(id ?? '')
  const { openModal } = useActions()

  const breakPoint = useBreakPoint()

  useAdditionalCrumbs('Группа 1')
  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (eventData) {
      const images: ImageItemWithText[] = []
      if (eventData.mainphoto) {
        images.push(eventData.mainphoto[0])
      }
      if (eventData.photos && Array.isArray(eventData.photos)) {
        images.push(...eventData.photos)
      }
      setAllPagePhoto(images)
    }
  }, [eventData])

  return (
    <div className={styles.participantInfoWrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.infoBlock}>
          <h2>{'МФК «Татар Батыр»'}</h2>
          <MainButton className={styles.enterGroupBtn} onClick={() => openModal(<RequestGroupModal />)}>Вступить в группу</MainButton>
          <div className={styles.listInfo}>
            <div className={styles.personInfo}>
              <InfoRow
                title='Категория:'
                label={
                  <span className={styles.infoBlockText}>{'Музыкальный фольклорный коллектив'}</span>
                }
                icon={<CategoryInfoSVG />}
                $titleWidth='auto'
                $gap='10px'
                $margin='0'
                $alignItems='center'
              />
              <InfoRow
                title='Разделы:'
                label={
                  <span className={styles.infoBlockText}>
                    {'Исконные забавы, фольклор, другое'}
                  </span>
                }
                icon={<SectionsInfoSVG />}
                $titleWidth='auto'
                $gap='10px'
                $margin='0'
                $alignItems='center'
                titleClassname={styles.infoBlockText}
              />
              <InfoRow
                title='Регион:'
                label={<span className={styles.infoBlockText}>{'Татарстан, республика'}</span>}
                icon={<PlaceIconSVG />}
                $titleWidth='auto'
                $gap='10px'
                $margin='0'
                $alignItems='center'
                titleClassname={styles.infoBlockText}
              />
            </div>
            <div className={styles.contactsInfo}>
              <InfoRow
                title='Телефон:'
                label={
                  <a href={`tel:${eventData?.contact_telphone}`} className={styles.infoBlockText}>
                    {'+7 (432) 900-00-00'}
                  </a>
                }
                icon={<PhoneEventIconSVG />}
                $titleWidth='auto'
                $gap='10px'
                $margin='0'
                $alignItems='center'
                titleClassname={styles.infoBlockText}
              />
              <InfoRow
                title='Электронная почта:'
                label={
                  <a href={`mailto:${eventData?.contact_email}`} className={styles.infoBlockText}>
                    {'3kosta@atmanov-ugol.ru'}
                  </a>
                }
                icon={<MailEventIconSVG />}
                $titleWidth='auto'
                $gap='10px'
                $margin='0'
                $alignItems='center'
                titleClassname={styles.infoBlockText}
              />
            </div>
          </div>
        </div>
        <div className={styles.avatarWrapper}>
          <GalleryImg images={allPagePhoto} variant='newsMain' />
        </div>
      </div>
      <p className={styles.descriptionText}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'
        }
      </p>
    </div>
  )
}
