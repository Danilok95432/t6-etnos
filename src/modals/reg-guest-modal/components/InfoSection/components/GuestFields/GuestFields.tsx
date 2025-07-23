import { useFormContext, useFieldArray } from 'react-hook-form'
import styles from './index.module.scss'
import { type FC, type MouseEvent } from 'react'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { TrashIconSvg } from 'src/UI/icons/trashIconSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'

type GuestFieldsProps = {
	disabled?: boolean
}

export const GuestFields: FC<GuestFieldsProps> = ({ disabled = false }) => {
	const { control } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		name: 'group_list',
		control,
	})

	return (
		<>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.guestsWrapper}>
					<FlexRow className={styles.groupInputs}>
						<FormInput
							name={`group_list[${field.id}].surname`}
							label='Фамилия'
							disabled={disabled}
						/>
						<FormInput name={`group_list[${field.id}].firstname`} label='Имя' disabled={disabled} />
					</FlexRow>
					<FlexRow className={styles.groupInputs}>
						<FormInput
							name={`group_list[${field.id}].fathname`}
							label='Отчество'
							disabled={disabled}
							className={styles.inputWrapperContainer}
						/>
						<FormInput
							name={`group_list[${field.id}].age`}
							label='Возраст'
							disabled={disabled}
							className={styles.shortInput}
						/>
						<button
							className={styles.deleteButton}
							onClick={(e: MouseEvent<HTMLButtonElement>) => {
								e.preventDefault()
								remove(Number(field.id))
							}}
						>
							<TrashIconSvg />
						</button>
					</FlexRow>
				</div>
			))}

			<div className={styles.buttonsRow}>
				<MainButton
					type='button'
					onClick={(e: MouseEvent<HTMLButtonElement>) => {
						e.preventDefault()
						append({
							age: '',
							surname: '',
							firstname: '',
							fathname: '',
						})
					}}
					disabled={disabled}
				>
					Добавить
				</MainButton>
			</div>
		</>
	)
}
