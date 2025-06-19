import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useEffect, useRef } from 'react'
import { RegInputs, regSchema } from './schema'
import { InfoSection } from './components/InfoSection/InfoSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const RegModal = () => {
  const { openModal, closeModal } = useActions()
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)

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
          <h2>Регистрация участника</h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
              <InfoSection />
              <RegionSection />
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
