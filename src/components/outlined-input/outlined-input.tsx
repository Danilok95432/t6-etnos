import React, { type FC, type FocusEventHandler, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'
import styles from './index.module.scss'
import InputMask from 'react-input-mask'
import cnBind from 'classnames/bind'

type OutlinedInputProps = {
	name: string
	isTextarea?: boolean
	mask?: string
	className?: string
	label?: string
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export const OutlinedInput: FC<OutlinedInputProps> = ({
	name,
	className,
	mask,
	label,
	isTextarea,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext()

	const [isFocused, setIsFocused] = useState<boolean>(false)

	const handleFocusIn: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = () => {
		setIsFocused(true)
	}

	const handleFocusOut: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
		if (!e.currentTarget.value) {
			setIsFocused(false)
		}
	}

	const cx = cnBind.bind(styles)

	useEffect(() => {
		if (watch(name)) {
			setIsFocused(true)
		}
	}, [watch(name)])

	if (isTextarea) {
		return (
			<div className={cn(styles.outlinedInput, className)}>
				<label
					className={cx(styles.outlinedWrapper, { _focused: isFocused, _textarea: isTextarea })}
				>
					{label && <p>{label}</p>}
					<textarea
						{...register(name)}
						{...props}
						onFocus={handleFocusIn}
						onBlur={handleFocusOut}
						className={cn(styles.inputEl, {
							[styles.noValid]: errors[name],
						})}
					/>
				</label>
				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)
	}

	return (
		<div className={cn(styles.outlinedInput, className)}>
			<label className={cx(styles.outlinedWrapper, { _focused: isFocused })}>
				{label && <p>{label}</p>}
				<InputMask
					{...register(name)}
					{...props}
					onFocus={handleFocusIn}
					onBlur={handleFocusOut}
					mask={mask ?? ''}
					className={cn(styles.inputEl, {
						[styles.noValid]: errors[name],
					})}
				/>
			</label>
			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
