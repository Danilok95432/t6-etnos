import React, { useState, useRef, InputHTMLAttributes, useEffect, RefObject } from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import styles from './index.module.scss'
import { Controller, FieldError, useFormContext } from 'react-hook-form'
import { MainButton } from '../MainButton/MainButton'
import {
  useCheckRegistrationCodeMutation,
  useGetRegistrationCodeMutation,
} from 'src/store/auth/auth.api'
import { SelOption } from 'src/types/select'
import { formatTime } from 'src/helpers/utils'
import { toast } from 'react-toastify'

interface CustomProps {
  label: string
  error?: string
  isPassword?: boolean
  isPhone?: boolean
  isPhoneWithCode?: boolean
  maskChar?: string
  dynamicError?: FieldError | undefined
  name: string
  is_select?: boolean
  isCode?: boolean
  selectOptions?: SelOption[]
  errorForm?: string
  searchValue?: string
  setSearchValue?: (value: string) => void
  setErrorForm?: (value: string) => void
  disabled?: boolean
  accept?: boolean
  isCodeAccepted?: boolean
  setIsCodeAccepted?: (arg0: boolean) => void
  setRegionValue?: (arg0: string) => void
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & CustomProps

export const FormInput: React.FC<TextInputProps> = ({
  label,
  error,
  isPassword = false,
  isPhone = false,
  isCode = false,
  isCodeAccepted,
  setIsCodeAccepted,
  setErrorForm,
  isPhoneWithCode = false,
  setRegionValue,
  className,
  errorForm,
  onFocus,
  maskChar = '_',
  name,
  is_select,
  selectOptions,
  searchValue = '',
  disabled,
  accept,
  setSearchValue,
  ...restProps
}) => {
  const { register, control, watch } = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isSended, setIsSended] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [wasFocusedOnce, setWasFocusedOnce] = useState(false)
  const fieldValue = watch(name)
  const shouldRaiseLabel = isFocused || fieldValue?.length > 0

  const [getCode] = useGetRegistrationCodeMutation()

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)
  const [countdown, setCountdown] = useState<number>(0)

  const handleSendCode = async (phone: string) => {
    try {
      const response = await getCode(phone)

      if ('error' in response) {
        toast.error('Не удалось отправить код. Проверьте соединение.', {
          position: 'bottom-right',
          autoClose: 5000,
        })
        return
      }
      const { status, errortext } = response.data

      if (status === 'ok') {
        setIsSended(true)
        setIsCodeAccepted?.(false)
        setErrorForm?.('')
        setCountdown(120)

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setIsSended(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else if (status === 'error') {
        toast.error(errortext || 'Ошибка при отправке кода. Повторите попытку позже', {
          position: 'bottom-right',
          autoClose: 5000,
        })
      }
    } catch (error) {
      toast.error('Неизвестная ошибка', {
        position: 'bottom-right',
        autoClose: 5000,
      })
      console.error('handleSendCode error:', error)
    }
  }

  if (is_select) {
    return (
      <div className={cn(styles.inputContainer, className)}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const wrapperRef = useRef<HTMLDivElement>(null)
            const [forceShowAllOptions, setForceShowAllOptions] = useState(false)

            useEffect(() => {
              const handleClickOutside = (event: MouseEvent) => {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                  setShowOptions(false)
                  setForceShowAllOptions(false)
                }
              }
              document.addEventListener('mousedown', handleClickOutside)
              return () => {
                document.removeEventListener('mousedown', handleClickOutside)
              }
            }, [])

            const filteredOptions = forceShowAllOptions
              ? selectOptions
              : selectOptions?.filter((opt) =>
                  opt.label.toLowerCase().includes((field.value || '').toLowerCase()),
                )

            return (
              <div
                className={cn(styles.inputWrapper, {
                  [styles.focused]: isFocused,
                  [styles.error]: !!error,
                  [styles.disabled]: disabled,
                })}
                ref={wrapperRef}
              >
                <input
                  className={styles.input}
                  value={field.value || ''}
                  disabled={disabled}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    setRegionValue?.(e.target.value)
                    setShowOptions(true)
                    setForceShowAllOptions(false)
                  }}
                  onFocus={() => {
                    setIsFocused(true)
                    setShowOptions(true)
                    setForceShowAllOptions(true)
                  }}
                />
                <label
                  className={cn(styles.label, {
                    [styles.raised]: shouldRaiseLabel,
                  })}
                >
                  {label}
                </label>
                {showOptions && filteredOptions && filteredOptions.length > 0 && (
                  <ul className={styles.selectOptions}>
                    {filteredOptions.map((option) => (
                      <li
                        key={option.value}
                        className={styles.option}
                        onClick={() => {
                          field.onChange(option.label)
                          setShowOptions(false)
                          setForceShowAllOptions(false)
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          }}
        />
      </div>
    )
  } else if (isCode) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle')
          const [checkPhoneCode] = useCheckRegistrationCodeMutation()

          const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/\D/g, '').slice(0, 5)
            field.onChange(rawValue)

            if (rawValue.length === 5) {
              try {
                const res = await checkPhoneCode({ phone: watch('phone'), code: rawValue })
                if ('data' in res && res.data?.status === 'ok') {
                  setStatus('ok')
                  setIsCodeAccepted?.(true)
                } else {
                  setStatus('error')
                  setIsCodeAccepted?.(false)
                }
              } catch (err) {
                setStatus('error')
              }
            } else {
              setStatus('idle')
            }
          }

          return (
            <div
              className={cn(styles.inputWrapper, {
                [styles.focused]: isFocused,
                [styles.error]: status === 'error',
                [styles.accept]: status === 'ok',
                [styles.disabled]: (disabled || isCodeAccepted) && errorForm === '',
              })}
            >
              <input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                maxLength={5}
                className={styles.input}
                value={field.value || ''}
                disabled={(disabled || isCodeAccepted) && errorForm === ''}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <label
                className={cn(styles.label, {
                  [styles.raised]: isFocused || !!field.value,
                })}
              >
                {label}
              </label>
            </div>
          )
        }}
      />
    )
  }

  return (
    <div className={cn(styles.inputContainer, className)}>
      <div
        className={cn(styles.inputWrapper, {
          [styles.focused]: isFocused,
          [styles.error]: !!error,
          [styles.disabled]: disabled,
          [styles.accept]: accept,
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
                  onFocus={() => {
                    handleFocus()
                  }}
                >
                  <input className={styles.input} type='tel' ref={field.ref} {...restProps} />
                </InputMask>
                {isPhoneWithCode && (
                  <MainButton
                    className={cn(styles.sendCodeBtn, { [styles.resend]: countdown > 0 })}
                    onClick={() => handleSendCode(fieldValue)}
                    disabled={!fieldValue || fieldValue.includes('_') || isSended || countdown > 0}
                  >
                    {countdown > 0 ? `Повторная отправка: ${countdown}` : 'Отправить код'}
                  </MainButton>
                )}
              </>
            )}
          />
        ) : (
          <input
            {...register(name)}
            className={styles.input}
            disabled={disabled}
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
