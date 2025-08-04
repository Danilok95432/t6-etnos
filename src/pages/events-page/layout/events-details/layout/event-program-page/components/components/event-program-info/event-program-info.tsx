import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import { useGetEventByIdQuery, useGetSubEventProgramByIdQuery } from 'src/store/events/events.api'
import {
  formatDateRange,
  formatDateRangeNumeric,
  formatSingleDate,
  formatTimeRange,
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
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useActions } from 'src/hooks/actions/actions'
import { RequestGroupModal } from 'src/modals/request-group-modal/request-group-modal'
import { GroupVidIconSVG } from 'src/UI/icons/groupVidIconSVG'
import { RequestSubEventModal } from 'src/modals/request-subevent-modal/request-subevent-modal'
import { LinkArrowSVG } from 'src/UI/icons/linkArrowSVG'
import { SingleVidIconSVG } from 'src/UI/icons/singleVidIconSVG'
import { useGetAllVidsQuery } from 'src/store/vids/vids.api'

export const EventProgramInfo = () => {
  const { id = '' } = useParams()
  const { subId = '' } = useParams()
  const { data: subEventData } = useGetSubEventProgramByIdQuery(subId)
  const { data: eventData } = useGetEventByIdQuery(id)
  const { data: vidsData } = useGetAllVidsQuery(1)
  const [vidId, setVidId] = useState<string>('')
  const { openModal } = useActions()

  const breakPoint = useBreakPoint()

  useAdditionalCrumbs(subEventData?.title)
  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (subEventData) {
      const images: ImageItemWithText[] = []
      if (subEventData.mainphoto) {
        images.push(subEventData.mainphoto[0])
      }
      setAllPagePhoto(images)
    }
  }, [subEventData])

  useEffect(() => {
    if (subEventData?.is_etnosport === 1) {
      let idVid = vidsData?.vids.find((vidEl) => vidEl.title === subEventData?.vid)
      if (idVid) setVidId(idVid?.id)
    }
  }, [subEventData])

  return (
    <div className={styles.eventInfoWrapper}>
      {/*
        <Link to={`/${AppRoute.Events}/${id}`} className={styles.linkBack}>
        <LinkArrowSVG />
        {`Основное событие: ${eventData?.title}`}
      </Link>
        */}
      <div className={styles.mainInfo}>
        <div className={styles.infoBlock}>
          <h2>{subEventData?.title}</h2>
          <FlexRow className={styles.topLineEvent}>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
              {`${formatSingleDate(subEventData?.itemdate ?? new Date())}, ${formatTimeRange([subEventData?.begin_time, subEventData?.end_time])}`}
            </CustomText>
            <div className={styles.dot}></div>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
              {subEventData?.is_etnosport ? 'Этноспорт' : 'Исконная забава'}
            </CustomText>
            <div className={styles.dot}></div>
            <FlexRow className={styles.vidRow}>
              {subEventData?.is_group ? (
                <>
                  <GroupVidIconSVG />
                  <p>Групповой вид</p>
                </>
              ) : (
                <>
                  <SingleVidIconSVG />
                  <p>Одиночный вид</p>
                </>
              )}
            </FlexRow>
            <div className={cn(styles.dot, styles._red)}></div>
            {subEventData?.is_etnosport === 1 ? (
              <p
                className={styles.vidLink}
              >
                {`${subEventData?.vid}`}
              </p>
            ) : (
              subEventData?.is_etnosport === 0 && <p className={styles.vidLink}>{`${subEventData?.vid}`}</p>
            )}
            { subEventData?.is_etnosport !== 2 && <div className={cn(styles.dot, styles._red)}></div> }
            <CustomText
              className={styles.ageRating}
              $fontSize={breakPoint === 'S' ? '18px' : '16px'}
              $color='#DE0008'
            >
              {eventData?.ageRating}+
            </CustomText>
          </FlexRow>
          <FlexRow className={styles.linkRules}>
            {subEventData?.rules.includes('http') && <a href={subEventData?.rules} download>Правила вида</a>}
            {subEventData?.reglament.includes('http')  && <a href={subEventData?.reglament} download>Регламент проведения</a>}
            {subEventData?.trebovania.includes('http') && <a href={subEventData?.trebovania} download>Требования к участникам</a>}
          </FlexRow>
          {/*
            <FlexRow className={styles.regButtons}>
            <MainButton
              onClick={() =>
                openModal(<RequestSubEventModal id_subEvent={subEventData?.id ?? ''} />)
              }
            >
              Подать заявку
            </MainButton>
          </FlexRow>
            */}
          <div className={styles.listInfo}>
            <div className={styles.locationInfo}>
              {subEventData?.address && (
                <InfoRow
                  title=''
                  label={<span className={styles.infoBlockText}>{subEventData?.address}</span>}
                  icon={<PlaceIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  wrapperClassname={styles.infoRowEvent}
                />
              )}
              {/*
                {subEventData?.organizator && (
                <InfoRow
                  title=''
                  label={
                    <Link
                      to={`/${AppRoute.Objects}/${eventData?.object.id}`}
                      className={styles.infoBlockText}
                    >
                      {subEventData?.organizator}
                    </Link>
                  }
                  icon={<ObjectIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                  wrapperClassname={styles.infoRowEvent}
                />
              )}
                */}

              {subEventData?.url && (
                <InfoRow
                  title=''
                  label={
                    <a href={eventData?.website} className={styles.infoBlockText}>
                      {subEventData?.url}
                    </a>
                  }
                  icon={<SiteIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                  wrapperClassname={styles.infoRowEvent}
                />
              )}
            </div>
            <div className={styles.contactsInfo}>
              {subEventData?.phone && (
                <InfoRow
                  title=''
                  label={
                    <a href={`tel:${subEventData?.phone}`} className={styles.infoBlockText}>
                      {subEventData?.phone}
                    </a>
                  }
                  icon={<PhoneEventIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                  wrapperClassname={styles.infoRowEvent}
                />
              )}

              {subEventData?.telegram && (
                <InfoRow
                  title=''
                  label={
                    <a href={subEventData?.telegram} className={styles.infoBlockText}>
                      {subEventData?.telegram}
                    </a>
                  }
                  icon={<TgEventIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                  wrapperClassname={styles.infoRowEvent}
                />
              )}

              {subEventData?.email && (
                <InfoRow
                  title=''
                  label={
                    <a href={`mailto:${subEventData?.email}`} className={styles.infoBlockText}>
                      {subEventData?.email}
                    </a>
                  }
                  icon={<MailEventIconSVG />}
                  $titleWidth='auto'
                  $gap='10px'
                  $margin='0'
                  $alignItems='center'
                  titleClassname={styles.infoBlockText}
                  wrapperClassname={styles.infoRowEvent}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.avatarWrapper}>
          <GalleryImg images={allPagePhoto} variant='newsMain' />
        </div>
      </div>
      <div className={subEventData?.short ? styles.programDescInfo : ''}>
        {subEventData?.short && <div dangerouslySetInnerHTML={{ __html: subEventData.short }} />}
      </div>
      <div className={subEventData?.rules ? styles.programDescInfo : ''}>
        {subEventData?.rules && <div dangerouslySetInnerHTML={{ __html: subEventData.rules }} />}
      </div>
    </div>
  )
}
