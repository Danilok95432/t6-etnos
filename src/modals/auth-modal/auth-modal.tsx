import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useEffect, useRef } from 'react'

export const AuthModal = () => {
  const { openModal, closeModal } = useActions()
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)

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
    <div className={styles.authModal} ref={modalRef}>
      <div className='modal-content'>
        <div className={styles.modalContent}>
          <LogoModalSVG />
          <h2>Вход в кабинет</h2>
          <form action='' className={styles.authForm}>
            <FormInput label='Логин (номер телефона)' isPhone={true} />
            <FormInput label='Пароль' isPassword={true} />
            <MainButton>Войти</MainButton>
          </form>
          <p>
            Забыли пароль? <a href='#'>Восстановить</a>
          </p>
        </div>
      </div>
    </div>
  )
}
