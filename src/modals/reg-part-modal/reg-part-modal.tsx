import { FormProvider, type SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { FC, useEffect, useRef } from 'react'
import { RegInputs, regSchema } from './schema'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { CustomText } from 'src/components/custom-text/custom-text'
import { formatDateRange, mainFormatDate } from 'src/helpers/utils'
import cn from 'classnames'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { InfoSection } from './components/InfoSection/InfoSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { DatesSection } from './components/DatesSection/DatesSection'
import { PartSection } from './components/PartSection/PartSection'

type RegEventPartModalProps = {
  id: string
}

export const RegEventPartModal: FC<RegEventPartModalProps> = ({ id }) => {
  const { closeModal } = useActions()
  const modalRef = useRef<HTMLDivElement>(null)
  const { data: eventDataInfo } = useGetEventByIdQuery(id ?? '')
  const breakPoint = useBreakPoint()

  const methods = useForm<RegInputs>({
    mode: 'onBlur',
    resolver: yupResolver(regSchema),
  })

  const onSubmit: SubmitHandler<RegInputs> = async (data) => {
    console.log(data)
    closeModal()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeModal])

  return (
    <div className={styles.regModal} ref={modalRef}>
      <div className='modal-content'>
        <div className={styles.modalContent}>
          <LogoModalSVG />
          <h2>{eventDataInfo?.title}</h2>
          <FlexRow className={styles.eventInfoLine}>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
              {eventDataInfo?.date && eventDataInfo.date.length > 1
                ? formatDateRange(eventDataInfo?.date as [Date, Date])
                : mainFormatDate(eventDataInfo?.date[0])}
            </CustomText>
            <div className={styles.dot}></div>
            <CustomText $fontSize={breakPoint === 'S' ? '18px' : '16px'}>
              {eventDataInfo?.location.address.split(',')[0]}
            </CustomText>
            <div className={cn(styles.dot, styles._red)}></div>
            <CustomText
              className={styles.ageRating}
              $fontSize={breakPoint === 'S' ? '18px' : '16px'}
              $color='#DE0008'
            >
              {eventDataInfo?.ageRating}+
            </CustomText>
          </FlexRow>
          <FlexRow className={styles.disclaimer}>
            <span className={styles.title}>Регистрация участника</span>
            <div className={styles.grayBox}>
              <p>
                Регистрация гостей и участников события строго обязательна. Это — требования
                безопасности.
              </p>
            </div>
          </FlexRow>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
              <InfoSection />
              <RegionSection />
              <PartSection />
              <DatesSection />
              <FlexRow className={cn(styles.disclaimer, styles._last)}>
                <div className={styles.grayBox}>
                  <p>
                    Внимание! Завершение регистрации означает согласие с Правилами пользования сайтом и Правилами регистрации на события.
                  </p>
                </div>
              </FlexRow>
              <MainButton type='submit'>Завершить регистрацию</MainButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
