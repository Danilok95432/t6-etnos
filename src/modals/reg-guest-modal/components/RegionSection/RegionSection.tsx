import { FC } from 'react'
import styles from '../../index.module.scss'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'

type RegionSectionProps = {
  regions?: SelOption[]
  citys?: SelOption[]
}

export const RegionSection: FC<RegionSectionProps> = ({
  regions = [{ label: '', value: '' }],
  citys = [{ label: '', value: '' }],
}) => {
  const { control } = useFormContext()
  const region = useWatch({ control, name: 'id_region' })
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Регион и населенный пункт</span>
      <div className={styles.inputwithLabel}>
        <FormInput
          name='id_region'
          label='Регион РФ'
          className={styles.noMargin}
          is_select
          selectOptions={regions ?? [{ label: 'Не выбрано', value: '0' }]}
        />
        <span>
          Начните ввод названия региона и выберите из предложенных вариантов. Если Вы не из России,
          наберите «ино» и выберите вариант «Иностранец».
        </span>
      </div>
      <div className={styles.inputwithLabel}>
        <FormInput
          name='id_city'
          label='Город или район'
          className={styles.noMargin}
          is_select
          selectOptions={citys ?? [{ label: 'Не выбрано', value: '0' }]}
          disabled={!region}
        />
        <span>
          После выбора региона начните ввод названия Вашего населенного пункта и выберите из
          предложенных вариантов. Если в пункте «Регион РФ» Вы выбрали вариант «Иностранец», в этом
          поле нужно ввести название государства, из которого Вы прибыли.
        </span>
      </div>
      <div className={styles.inputwithLabel}>
        <FormInput 
          name='cityname' 
          label='Населенный пункт' 
          className={styles.noMargin}
          disabled={!region}
        />
        <span>
          Введите название населенного пункта.
        </span>
      </div>
    </div>
  )
}
