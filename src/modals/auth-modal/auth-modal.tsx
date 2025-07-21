import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useEffect, useRef } from 'react'
import { AuthInputs, authSchema } from './schema'
import { LogoModalMobileSVG } from 'src/UI/icons/logoModalMobileSVG'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const AuthModal = () => {
  const { openModal, closeModal } = useActions()
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const breakPoint = useBreakPoint()

  const methods = useForm<AuthInputs>({
		mode: 'onBlur',
		resolver: yupResolver(authSchema),
	})

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
		console.log(data)
    closeModal()
	}

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth < 768) return

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
    <div className={styles.authModal} ref={modalRef}>
      <div className='modal-content'>
        <div className={styles.modalContent}>
          {breakPoint === 'S' ? <LogoModalMobileSVG /> : <LogoModalSVG />}
          <h2>Вход в кабинет</h2>
          <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.authForm}>
                <FormInput name='phone' label='Логин (номер телефона)' isPhone={true} />
                <FormInput name='password' label='Пароль' isPassword={true} />
                <MainButton type='submit'>Войти</MainButton>
              </form>
          </FormProvider>
          <p className={styles.forgetPassword}>
            Забыли пароль? <a href='#'>Восстановить</a>
          </p>
        </div>
      </div>
    </div>
  )
}
