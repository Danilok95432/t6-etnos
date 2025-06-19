import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import styles from './index.module.scss'
import { useEffect } from 'react'

export const GuestFields = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'guests',
    control,
  })

  const count_ts = useWatch({ control, name: 'count_guests' })

  useEffect(() => {
    const targetCount = parseInt(count_ts || '1', 10)
    const currentCount = fields.length
    
    if (targetCount === currentCount) return
    
    if (targetCount > currentCount) {
      const itemsToAdd = Array(targetCount - currentCount).fill({ type: '0', password: '' })
      append(itemsToAdd, { shouldFocus: false })
    } else {
      const indexesToRemove = Array.from(
        { length: currentCount - targetCount },
        (_, i) => currentCount - 1 - i
      )
      remove(indexesToRemove)
    }
  }, [count_ts])

  const displayCount = Math.max(parseInt(count_ts || '1', 10), 1)
  const displayFields = fields.slice(0, displayCount)

  return (
    <>
      {displayFields.map((field, index) => (
        <div key={field.id} className={styles.guestsWrapper}>
          <FormInput name={`guests.${index}.age`} label='Возраст' className={styles.shortInput} />
          <FormInput name={`guests.${index}.secondName`} label='Фамилия' />
          <FormInput name={`guests.${index}.firtsName`} label='Имя' />
          <FormInput name={`guests.${index}.patronymic`} label='Отчество' />
        </div>
      ))}
    </>
  )
}
