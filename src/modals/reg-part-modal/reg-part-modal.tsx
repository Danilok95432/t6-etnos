import { FormProvider, type SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { FC, useEffect, useRef, useState } from 'react'
import { RegInputs, regSchema } from './schema'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { CustomText } from 'src/components/custom-text/custom-text'
import {
  booleanToNumberString,
  formatDateRange,
  formatDateToYYYYMMDD,
  mainFormatDate,
  transformToFormData,
} from 'src/helpers/utils'
import cn from 'classnames'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { InfoSection } from './components/InfoSection/InfoSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { DatesSection } from './components/DatesSection/DatesSection'
import { PartSection } from './components/PartSection/PartSection'
import { useParams } from 'react-router-dom'
import {
  useCheckRegistrationCodeMutation,
  useGetCityByRegionQuery,
  useGetInfoRegistationQuery,
  useGetRegionsByValueQuery,
  useSendRegistrationFormMutation,
} from 'src/store/auth/auth.api'
import { toast } from 'react-toastify'

type RegEventPartModalProps = {
  id: string
}

export const RegEventPartModal: FC<RegEventPartModalProps> = ({ id }) => {
  const { closeModal } = useActions()
  const modalRef = useRef<HTMLDivElement>(null)
  const { data: eventDataInfo } = useGetEventByIdQuery(id ?? '')
  const { data: selectOptions } = useGetInfoRegistationQuery(id ?? '')
  const { data: regions } = useGetRegionsByValueQuery('')
  const [saveRegForm] = useSendRegistrationFormMutation()
  const [checkPhoneCode] = useCheckRegistrationCodeMutation()
  const [isCodeAccepted, setIsCodeAccepted] = useState(false)
  const [errorForm, setErrorForm] = useState<string>('')
  const breakPoint = useBreakPoint()

  const methods = useForm<RegInputs>({
    mode: 'onBlur',
    resolver: yupResolver(regSchema),
  })

  const regionValue = useWatch({
    control: methods.control,
    name: 'id_region',
  })

  const { data: citys } = useGetCityByRegionQuery(
    regions && regions?.regions?.length > 0 && regionValue
      ? regions.regions.find((reg) => reg.label === regionValue)?.value || ' '
      : ' ',
  )

  const onSubmit: SubmitHandler<RegInputs> = async (data) => {
    const region = regions?.regions.filter((reg) => reg.label == data.id_region)[0].value
    const city = citys?.citys.filter((nas) => nas.label == data.id_city)[0].value
    const serverData = {
      id_reg_type: '1',
      id_event: id,
      surname: data.surname,
      firstname: data.firstname,
      fathname: data.fathname,
      age: data.age,
      birthdate: formatDateToYYYYMMDD(data.birthdate),
      id_region: region,
      id_city: city,
      cityname: data.cityname,
      email: data.email,
      phone: data.phone,
      use_lager: booleanToNumberString(data.use_lager),
      lager_count: data.lager_count,
      data_zaezd: data.data_zaezd,
      data_viezd: data.data_viezd,
      use_sportsmen: booleanToNumberString(data.use_sportsmen),
      use_folk: booleanToNumberString(data.use_folk),
      use_trader: booleanToNumberString(data.use_trader),
      use_master: booleanToNumberString(data.use_master),
      master_name: data.master_name,
      use_journalist: booleanToNumberString(data.use_journalist),
      journal_name: data.journal_name,
      use_car: booleanToNumberString(data.use_car),
      id_car_type: data.id_car_type,
      car_number: data.car_number,
    }
    const phoneData = {
      phone: data.phone,
      code: data.code,
    }
    try {
      if (isCodeAccepted) {
        const regForm = transformToFormData(serverData)
        const res = (await saveRegForm(regForm)) as unknown as {
          data: { status: string; errortext: string }
        }
        if (res.data.status === 'ok') {
          toast.success('Регистрация прошла успешно!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          closeModal()
        } else {
          toast.error('Произошла ошибка при регистрации', {
            position: 'bottom-right',
          })
          setErrorForm(res.data.errortext)
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalEl = modalRef.current
      const target = event.target as HTMLElement

      if (!modalEl || modalEl.contains(target)) return
      const { clientX, clientY } = event
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const scrollbarSize = 16
      const isClickOnScrollbar =
        clientX >= windowWidth - scrollbarSize || clientY >= windowHeight - scrollbarSize

      if (isClickOnScrollbar) return

      closeModal()
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
              <InfoSection
                setIsCodeAccepted={setIsCodeAccepted}
                isCodeAccepted={isCodeAccepted}
                errorForm={errorForm}
                setErrorForm={setErrorForm}
              />
              <RegionSection regions={regions?.regions} citys={citys?.citys} />
              <PartSection
                selectOptionsCars={selectOptions?.car_types}
                selectOptionsLager={selectOptions?.lager_types}
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
              <MainButton type='submit' disabled={!isCodeAccepted}>
                Завершить регистрацию
              </MainButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
