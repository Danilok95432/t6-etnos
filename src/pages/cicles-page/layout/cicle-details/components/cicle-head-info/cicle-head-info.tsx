import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import { useGetEventByIdQuery } from 'src/store/events/events.api'
import {
  formatDateRange,
  formatDateRangeNumeric,
  formatSingleDate,
  mainFormatDate,
  parseTimeFromDate,
} from 'src/helpers/utils'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { useAdditionalCrumbs } from 'src/hooks/additional-crumbs/additional-crumbs'

import { InfoRow } from 'src/UI/InfoRow/InfoRow'
import { CustomText } from 'src/components/custom-text/custom-text'
import { AppRoute } from 'src/routes/main-routes/consts'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { EventStatus } from 'src/components/event-status/event-status'
import { ObjectIconSVG } from 'src/UI/icons/objectIconSVG'
import { PlaceIconSVG } from 'src/UI/icons/placeIconSVG'
import { SiteIconSVG } from 'src/UI/icons/siteIconSVG'
import { PhoneEventIconSVG } from 'src/UI/icons/phoneEventIconSVG'
import { TgEventIconSVG } from 'src/UI/icons/tgEventIconSVG'
import { MailEventIconSVG } from 'src/UI/icons/mailEventIconSVG'

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { useActions } from 'src/hooks/actions/actions'
import { useGetCicleInfoQuery } from 'src/store/cicles/cicles.api'

export const CicleHeadInfo = () => {
  const { id } = useParams()

	const { data: cicleInfo } = useGetCicleInfoQuery(id ?? '')
  const { openModal } = useActions()

  const breakPoint = useBreakPoint()

  useAdditionalCrumbs(cicleInfo?.cicle_name)
  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (cicleInfo) {
      const images: ImageItemWithText[] = []
      if (cicleInfo?.mainphoto) {
        images.push(cicleInfo.mainphoto[0])
      }
      if (cicleInfo?.photos && Array.isArray(cicleInfo?.photos)) {
        images.push(...cicleInfo?.photos)
      }
      setAllPagePhoto(images)
    }
  }, [cicleInfo])

  return (
    <div className={styles.cicleInfoWrapper}>
      <div className={styles.mainInfo}>
        <div className={styles.infoBlock}>
          <h2>{cicleInfo?.cicle_name}</h2>
          <FlexRow className={styles.topLineEvent}>
            <CustomText $fontSize={'17px'}>{cicleInfo?.cicle_dates}</CustomText>
            <div className={styles.dot}></div>
            <CustomText $fontSize={'17px'}>{`Фестиваль`}</CustomText>
            <div className={styles.dot}></div>
            <CustomText $fontSize={'17px'}>{`5 событий`}</CustomText>
            <div className={cn(styles.dot, styles._red)}></div>
            <CustomText className={styles.ageRating} $fontSize={'17px'} $color='#DE0008'>
              {cicleInfo?.age}+
            </CustomText>
          </FlexRow>
          <div className={styles.listInfo}>
            <div className={styles.locationInfo}>
              {cicleInfo?.place && (
                <InfoRow
                  title=''
                  label={
                    <span className={styles.infoBlockText}>{cicleInfo?.place}</span>
                  }
                  icon={<PlaceIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                />
              )}

              {cicleInfo?.docs && (
                <InfoRow
                  title=''
                  label={
                    <Link
                      to={`/${AppRoute.Objects}/${cicleInfo?.docs.id}`}
                      className={styles.infoBlockText}
                    >
                      {cicleInfo?.docs.title}
                    </Link>
                  }
                  icon={<ObjectIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                />
              )}

              {cicleInfo?.url && (
                <InfoRow
                  title=''
                  label={
                    <a href={cicleInfo?.url} className={styles.infoBlockText}>
                      {cicleInfo?.url}
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
            <div className={styles.contactsInfo}>
              {cicleInfo?.phone && (
                <InfoRow
                  title=''
                  label={
                    <a href={`tel:${cicleInfo?.phone}`} className={styles.infoBlockText}>
                      {cicleInfo?.phone}
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

              {cicleInfo?.telegram && (
                <InfoRow
                  title=''
                  label={
                    <a href={cicleInfo?.telegram} className={styles.infoBlockText}>
                      {cicleInfo?.telegram}
                    </a>
                  }
                  icon={<TgEventIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                />
              )}

              {cicleInfo?.email && (
                <InfoRow
                  title=''
                  label={
                    <a href={`mailto:${cicleInfo?.email}`} className={styles.infoBlockText}>
                      {cicleInfo?.email}
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
            </div>
          </div>
        </div>
        <div className={styles.avatarWrapper}>
          <GalleryImg images={allPagePhoto} variant='newsMain' />
        </div>
      </div>
      <CustomText $lineHeight='1.3' $fontSize={`20px`} $margin='20px 0 10px 0' className={styles.infoBlockText}>
        {cicleInfo?.anonstext}
      </CustomText>
    </div>
  )
}
