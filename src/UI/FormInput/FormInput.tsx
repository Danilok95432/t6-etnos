import React, {
  useState,
  useRef,
  InputHTMLAttributes,
  FocusEvent,
  ChangeEvent,
} from 'react'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import styles from './index.module.scss'

interface CustomProps {
  label: string
  error?: string
  isPassword?: boolean
  isPhone?: boolean
  maskChar?: string
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & CustomProps

export const FormInput: React.FC<TextInputProps> = ({
  label,
  error,
  isPassword = false,
  isPhone = false,
  className,
  onFocus,
  onBlur,
  onChange,
  value,
  maskChar = '_',
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(!!value)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setHasValue(!!e.target.value)
    onBlur?.(e)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value)
    onChange?.(e)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className={cn(styles.inputContainer, className)}>
      <div
        className={cn(styles.inputWrapper, {
          [styles.focused]: isFocused,
          [styles.error]: !!error,
        })}
      >
        {isPhone ? (
          <InputMask
            mask="+7 (999) 999-99-99"
            maskChar={maskChar}
            alwaysShowMask={false}
            value={value as string}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <input
              ref={inputRef}
              className={styles.input}
              type="tel"
              {...restProps}
            />
          </InputMask>
        ) : (
          <input
            ref={inputRef}
            className={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            type={isPassword && !showPassword ? 'password' : 'text'}
            value={value}
            {...restProps}
          />
        )}

        <label
          className={cn(styles.label, {
            [styles.raised]: isFocused || hasValue,
          })}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            className={cn({
              [styles.toggleButtonHide]: !showPassword,
              [styles.toogleButtonShow]: showPassword,
            })}
            onClick={togglePasswordVisibility}
          ></button>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
