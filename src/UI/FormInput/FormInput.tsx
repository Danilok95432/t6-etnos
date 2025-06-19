import React, { useState, useRef, InputHTMLAttributes, FocusEvent } from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import styles from './index.module.scss'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { MainButton } from '../MainButton/MainButton'
import { useGetRegistrationCodeMutation } from 'src/store/auth/auth.api'

interface CustomProps {
  label: string
  error?: string
  isPassword?: boolean
  isPhone?: boolean
  isPhoneWithCode?: boolean
  maskChar?: string
  dynamicError?: FieldError | undefined
  name: string
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & CustomProps

export const FormInput: React.FC<TextInputProps> = ({
  label,
  error,
  isPassword = false,
  isPhone = false,
  isPhoneWithCode = false,
  className,
  onFocus,
  maskChar = '_',
  name,
  ...restProps
}) => {
  const { register, control, watch } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isSended, setIsSended] = useState(false)
  const fieldValue = watch(name)
  const shouldRaiseLabel = isFocused || fieldValue?.length > 0

  const [getCode] = useGetRegistrationCodeMutation()

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)
  const handleSendCode = async(phone: string) => {
    const res = await getCode(phone)
    setIsSended(true)
  }

  return (
    <div className={cn(styles.inputContainer, className)}>
      <div
        className={cn(styles.inputWrapper, {
          [styles.focused]: isFocused,
          [styles.error]: !!error,
        })}
      >
        {isPhone || isPhoneWithCode ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <InputMask
                  mask='+7 (999) 999-99-99'
                  inputRef={(e) => {
                    field.ref(e)
                    ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e
                  }}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  onFocus={(e) => {
                    handleFocus()
                  }}
                >
                  <input className={styles.input} type='tel' ref={field.ref} {...restProps} />
                </InputMask>
                {isPhoneWithCode && (
                  <MainButton
                    className={styles.sendCodeBtn}
                    onClick={() => handleSendCode(fieldValue)}
                    disabled={!fieldValue || fieldValue.includes('_') || isSended}
                  >
                    Отправить код
                  </MainButton>
                )}
              </>
            )}
          />
        ) : (
          <input
            {...register(name)}
            className={styles.input}
            ref={(e) => {
              register(name).ref(e)
              ;(inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
        <label
          className={cn(styles.label, {
            [styles.raised]: shouldRaiseLabel,
          })}
        >
          {label}
        </label>
      </div>
    </div>
  )
}
