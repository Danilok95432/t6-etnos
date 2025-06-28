import { FC, useState } from 'react'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { useGetCityByRegionQuery, useGetRegionsByValueQuery } from 'src/store/auth/auth.api'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { SelOption } from 'src/types/select'

type RegionSectionProps = {
  regions?: SelOption[],
  citys?: SelOption[]
}

export const RegionSection:FC<RegionSectionProps> = ({ regions = [{label: '', value: ''}], citys = [{label: '', value: ''}] }) => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Регион и населенный пункт</span>
      <div className={styles.inputwithLabel}>
        <FormInput 
          name='id_region' 
          label='Регион РФ' 
          className={styles.noMargin}
          is_select
          selectOptions={regions ?? [{label: 'Не выбрано', value: '0'}]}
        />
        <span>
          Начните ввод названия региона и выберите из предложенных вариантов. Если Вы не из России,
          наберите «ино» и выберите вариант «Иностранец».
        </span>
      </div>
      <div className={styles.inputwithLabel}>
        <FormInput 
          name='id_city' 
          label='Населенный пункт' 
          className={styles.noMargin}
          is_select
          selectOptions={citys ?? [{label: 'Не выбрано', value: '0'}]}
        />
        <span>
          После выбора региона начните ввод названия Вашего населенного пункта и выберите из
          предложенных вариантов. Если в пункте «Регион РФ» Вы выбрали вариант «Иностранец», в этом
          поле нужно ввести название государства, из которого Вы прибыли.
        </span>
      </div>
    </div>
  )
}
