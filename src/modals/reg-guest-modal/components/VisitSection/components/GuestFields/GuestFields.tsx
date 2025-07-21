import { useFormContext, useFieldArray } from 'react-hook-form'
import styles from './index.module.scss'
import { type FC, type MouseEvent } from 'react'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { TrashIconSvg } from 'src/UI/icons/trashIconSVG'

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
					<div className={styles.firstGroupInfo}>
						<FormInput
							name={`group_list[${field.id}].age`}
							label='Возраст'
							className={styles.shortInput}
							disabled={disabled}
						/>
						<FormInput
							name={`group_list[${field.id}].surname`}
							label='Фамилия'
							disabled={disabled}
						/>
					</div>
					<div className={styles.secondGroupInfo}>
						<FormInput name={`group_list[${field.id}].firstname`} label='Имя' disabled={disabled} />
						<FormInput
							name={`group_list[${field.id}].fathname`}
							label='Отчество'
							disabled={disabled}
						/>
					</div>
					<button
						className={styles.deleteButton}
						onClick={(e: MouseEvent<HTMLButtonElement>) => {
							e.preventDefault()
              if (index > 0)
							  remove(Number(field.id))
						}}
						style={{
							cursor: fields.length > 1 ? 'pointer' : 'not-allowed',
							opacity: fields.length > 1 ? 1 : 0.5,
						}}
					>
						<TrashIconSvg />
					</button>
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
