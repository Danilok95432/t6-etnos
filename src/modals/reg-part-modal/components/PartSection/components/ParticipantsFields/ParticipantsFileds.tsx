import { useFormContext, useFieldArray } from 'react-hook-form'
import styles from './index.module.scss'
import { useEffect, type FC, type MouseEvent } from 'react'
import { type RegInputs } from 'src/modals/reg-part-modal/schema'
import cn from 'classnames'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { TrashIconSvg } from 'src/UI/icons/trashIconSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'

type ParticipantsFieldsProps = {
	disabled?: boolean
}

export const ParticipantsFields: FC<ParticipantsFieldsProps> = ({ disabled = false }) => {
	const {
		control,
		getValues,
		setValue,
		formState: { errors },
	} = useFormContext<RegInputs>()
	const { fields, append, remove } = useFieldArray({
		name: 'group_list',
		control,
	})

	useEffect(() => {
		const currentList = getValues('group_list') ?? []
		const undefinedItemsIndexes = currentList
			.map((item, index) =>
				item?.surname === undefined ||
				item?.firstname === undefined ||
				item?.fathname === undefined ||
				item?.age === undefined
					? index
					: -1,
			)
			.filter((index) => index !== -1)
			.reverse()

		if (undefinedItemsIndexes.length > 0) {
			undefinedItemsIndexes.forEach((index) => {
				remove(index)
			})
		}
	}, [fields, getValues, remove, setValue])

	return (
		<>
			{fields.map((field, index) => {
				const groupListErrors = errors.group_list?.[index] ?? {}
				return (
					<div key={field.id} className={styles.guestsWrapper}>
						<div className={styles.firstGroupInfo}>
							<div className={styles.inputWrapperWithError}>
								<FormInput
									name={`group_list.${index}.age`}
									label='Возраст'
									className={styles.shortInput}
									disabled={disabled}
									error={groupListErrors.age?.message}
								/>
								{groupListErrors.age?.message && (
									<div className={styles.errorBox}>
										<span>{groupListErrors.age?.message}</span>
									</div>
								)}
							</div>
							<div className={styles.inputWrapperWithError}>
								<FormInput
									name={`group_list.${index}.surname`}
									label='Фамилия'
									disabled={disabled}
									error={groupListErrors.surname?.message}
								/>
								{groupListErrors.surname?.message && (
									<div className={styles.errorBox}>
										<span>{groupListErrors.surname?.message}</span>
									</div>
								)}
							</div>
						</div>
						<div className={styles.secondGroupInfo}>
							<div className={styles.inputWrapperWithError}>
								<FormInput
									name={`group_list.${index}.firstname`}
									label='Имя'
									disabled={disabled}
									error={groupListErrors.firstname?.message}
								/>
								{groupListErrors.firstname?.message && (
									<div className={styles.errorBox}>
										<span>{groupListErrors.firstname?.message}</span>
									</div>
								)}
							</div>
							<FormInput
								name={`group_list.${index}.fathname`}
								label='Отчество'
								disabled={disabled}
							/>
						</div>
						{index > 0 && (
							<button
								className={cn(styles.deleteButton, { [styles.disabled]: disabled })}
								disabled={disabled}
								onClick={(e: MouseEvent<HTMLButtonElement>) => {
									e.preventDefault()
									remove(index)
								}}
							>
								<TrashIconSvg />
							</button>
						)}
					</div>
				)
			})}

			<div className={styles.buttonsRow}>
				<MainButton
					type='button'
					onClick={(e: MouseEvent<HTMLButtonElement>) => {
						e.preventDefault()
						append(
							{
								age: '',
								surname: '',
								firstname: '',
								fathname: '',
							},
							{ shouldFocus: false },
						)
					}}
					disabled={disabled}
				>
					Добавить участника
				</MainButton>
			</div>
		</>
	)
}
