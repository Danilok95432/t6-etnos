import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { FC, useEffect, useRef, useState } from 'react'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { RegGuestInputs, regGuestSchema } from './schema'
import { InfoSection } from './components/InfoSection/InfoSection'
import { VisitSection } from './components/VisitSection/VisitSection'
import { DatesSection } from './components/DatesSection/DatesSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { CustomText } from 'src/components/custom-text/custom-text'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import {
  booleanToNumberString,
  buildFormDataGuestModal,
  formatDateRange,
  mainFormatDate,
  transformToFormData,
} from 'src/helpers/utils'
import {
  useCheckRegistrationCodeMutation,
  useGetCityByRegionQuery,
  useGetInfoRegistationQuery,
  useGetRegionsByValueQuery,
  useSendRegistrationGuestFormMutation,
} from 'src/store/auth/auth.api'

type RegEventGuestModalProps = {
  id: string
}

export const RegEventGuestModal: FC<RegEventGuestModalProps> = ({ id }) => {
  const { closeModal } = useActions()
  const modalRef = useRef<HTMLDivElement>(null)
  const { data: eventDataInfo } = useGetEventByIdQuery(id ?? '')
  const { data: selectOptions } = useGetInfoRegistationQuery(id ?? '')
  const { data: regions } = useGetRegionsByValueQuery(' ')
  const { data: citys } = useGetCityByRegionQuery('')
  const [isCodeAccepted, setIsCodeAccepted] = useState(false)
  const [sendRegForm] = useSendRegistrationGuestFormMutation()
  const [checkPhoneCode] = useCheckRegistrationCodeMutation()
  const breakPoint = useBreakPoint()

  const methods = useForm<RegGuestInputs>({
    mode: 'onBlur',
    resolver: yupResolver(regGuestSchema),
  })

  const onSubmit: SubmitHandler<RegGuestInputs> = async (data) => {
    const region = regions?.regions.filter((reg) => reg.label == data.id_region)[0].value
    const city = citys?.citys.filter((nas) => nas.label == data.id_city)[0].value
    const formData = new FormData()
    formData.append('id_reg_type', '1')
    formData.append('id_event', id)
    formData.append('surname', data.surname)
    formData.append('firstname', data.firstname)
    formData.append('fathname', data.fathname ?? '')
    formData.append('age', data.age)
    formData.append('id_region', region ?? '')
    formData.append('id_city', city ?? '')
    formData.append('email', data.email)
    formData.append('use_group', booleanToNumberString(data.use_group))
    if (data.use_group) {
      formData.append('group_name', data.group_name ?? '')
      formData.append('id_group_type', data.id_group_type ?? '')
      formData.append('group_count', data.group_count ?? '')
      data.group_list?.forEach((group, index) => {
        formData.append(`group_list_age[${index}]`, group.age)
        formData.append(`group_list_surname[${index}]`, group.surname)
        formData.append(`group_list_firstname[${index}]`, group.firstname)
        formData.append(`group_list_fathname[${index}]`, group.fathname)
      })
    }
    formData.append('use_car', booleanToNumberString(data.use_car))
    if (data.use_car) {
      formData.append('cars_count', data.cars_count ?? '')
      data.cars_list?.forEach((car, index) => {
        formData.append(`cars_list_car_type[${index}]`, car.car_type)
        formData.append(`cars_list_car_number[${index}]`, car.car_number)
      })
    }
    formData.append('use_lager', booleanToNumberString(data.use_lager))
    if (data.use_lager) {
      formData.append('id_lager_type', data.id_lager_type ?? '')
      formData.append('lager_count', data.lager_count ?? '')
    }
    formData.append('data_zaezd', data.data_zaezd ?? '')
    formData.append('data_viezd', data.data_viezd ?? '')

    const phoneData = {
      phone: data.phone,
      code: data.code,
    }
    try {
      if (isCodeAccepted) {
        const res = await sendRegForm(formData)
        if (res) {
          closeModal()
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    }
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
            <span className={styles.title}>Регистрация гостей</span>
            <div className={styles.grayBox}>
              <p>
                Регистрация гостей и участников события строго обязательна. Это — требования
                безопасности.
              </p>
            </div>
          </FlexRow>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
              <InfoSection setIsCodeAccepted={setIsCodeAccepted} />
              <RegionSection regions={regions?.regions} citys={citys?.citys} />
              <VisitSection
                selectOptionsGroup={selectOptions?.guest_group_types}
                selectOptionsLager={selectOptions?.lager_types}
                selectOptionsCars={selectOptions?.car_types}
              />
              <DatesSection selectOptions={selectOptions?.dates} />
              <FlexRow className={cn(styles.disclaimer, styles._last)}>
                <div className={styles.grayBox}>
                  <p>
                    Внимание! Завершение регистрации означает согласие с Правилами пользования
                    сайтом и Правилами регистрации на события.
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
