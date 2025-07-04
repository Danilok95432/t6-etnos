import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useEffect, useRef, useState } from 'react'
import { RegNewInputs, regNewSchema } from './schema'
import { InfoSection } from './components/InfoSection/InfoSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { FlexRow } from 'src/components/flex-row/flex-row'
import {
  useCheckRegistrationCodeMutation,
  useGetCityByRegionQuery,
  useGetInfoRegistationQuery,
  useGetRegionsByValueQuery,
  useSendRegistrationFormMutation,
} from 'src/store/auth/auth.api'
import { formatDateToYYYYMMDD, transformToFormData } from 'src/helpers/utils'
import { toast } from 'react-toastify'

export const RegModal = () => {
  const { openModal, closeModal } = useActions()
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const { data: regions } = useGetRegionsByValueQuery(' ')
  const [isCodeAccepted, setIsCodeAccepted] = useState(false)
  const [saveRegForm] = useSendRegistrationFormMutation()
  const [checkPhoneCode] = useCheckRegistrationCodeMutation()
  const [errorForm, setErrorForm] = useState<string>('')

  const methods = useForm<RegNewInputs>({
    mode: 'onBlur',
    resolver: yupResolver(regNewSchema),
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

  const onSubmit: SubmitHandler<RegNewInputs> = async (data) => {
    const region = regions?.regions.filter((reg) => reg.label == data.id_region)[0].value
    const city = citys?.citys.filter((nas) => nas.label == data.id_city)[0].value
    const serverData = {
      id_reg_type: '2',
      surname: data.surname,
      firstname: data.firstname,
      fathname: data.fathname,
      birthdate: formatDateToYYYYMMDD(data.birthdate),
      id_region: region,
      id_city: city,
      cityname: data.cityname,
      email: data.email,
      phone: data.phone,
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
          closeModal()
          toast.success('Регистрация прошла успешно!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
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
    closeModal()
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
          <h2>Регистрация участника</h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
              <InfoSection
                setIsCodeAccepted={setIsCodeAccepted}
                isCodeAccepted={isCodeAccepted}
                errorForm={errorForm}
                setErrorForm={setErrorForm}
              />
              <RegionSection regions={regions?.regions} citys={citys?.citys} />
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
