import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import styles from './index.module.scss'
import { FC, useEffect } from 'react'
import { SelOption } from 'src/types/select'

type CarsFieldsProps = {
  selectOptionsCars?: SelOption[]
  disabled?: boolean
}

export const CarsFields:FC<CarsFieldsProps> = ({selectOptionsCars = [{ label: 'Не выбрано', value: '0' }], disabled }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'cars_list',
    control,
  })

  const count_ts = useWatch({ control, name: 'cars_count' })

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
        <div key={field.id} className={styles.carsWrapper}>
          <ControlledSelect
            className={styles.selectForm}
            name={`cars_list[${index}].car_type`}
            selectOptions={selectOptionsCars}
            disabled={disabled}
            label='Тип ТС'
          />
          <FormInput name={`cars_list[${index}].car_number`} label='Госномер' disabled={disabled} />
        </div>
      ))}
    </>
  )
}