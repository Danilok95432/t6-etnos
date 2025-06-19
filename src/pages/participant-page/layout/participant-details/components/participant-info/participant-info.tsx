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

export const ParticipantInfo = () => {
  const { id = '' } = useParams()
  const { data: eventData } = useGetEventByIdQuery(id ?? '')
  const { openModal } = useActions()

  const breakPoint = useBreakPoint()

  useAdditionalCrumbs('Болдырев Егор Александрович')
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
          <h2>{'Болдырев Егор Александрович'}</h2>
          <FlexRow className={styles.topLineParticipant}>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
              {'Капитан спортивной команды'}
            </CustomText>
            <div className={styles.dot}></div>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
              {'Фольклорист'}
            </CustomText>
            <div className={styles.dot}></div>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>{'Спортсмен'}</CustomText>
          </FlexRow>
          <MainButton>Пригласить в группу</MainButton>
          <div className={styles.listInfo}>
            <div className={styles.personInfo}>
              {eventData?.location?.address && (
                <InfoRow
                  title='Дата рождения и возраст:'
                  label={
                    <span className={styles.infoBlockText}>{'17 октября 1981 года (43 года)'}</span>
                  }
                  icon={<BirthdayParticipantSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                />
              )}

              {eventData?.object?.title && (
                <InfoRow
                  title='Населенный пункт:'
                  label={
                    <span className={styles.infoBlockText}>
                      {'Россия, Тамбовская обл., Сосновский р-н, с. Атманов Угол'}
                    </span>
                  }
                  icon={<PlaceIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                />
              )}

              {eventData?.website && (
                <InfoRow
                  title='Пол:'
                  label={<span className={styles.infoBlockText}>{'мужской'}</span>}
                  icon={<GenderParticipantSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                />
              )}
            </div>
            <div className={styles.contactsInfo}>
              {eventData?.contact_telphone && (
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
              )}

              {eventData?.contact_email && (
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
              )}

              {eventData?.contact_tg && (
                <InfoRow
                  title='Сайт/социальная сеть:'
                  label={
                    <a href={'#'} className={styles.infoBlockText}>
                      {'www.example.com/konstantinopolskiy'}
                    </a>
                  }
                  icon={<SiteIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                />
              )}
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
