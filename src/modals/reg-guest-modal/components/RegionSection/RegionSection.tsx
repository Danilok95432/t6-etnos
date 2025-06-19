import styles from '../../index.module.scss'
import { FormInput } from 'src/UI/FormInput/FormInput'

export const RegionSection = () => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Регион и населенный пункт</span>
      <div className={styles.inputwithLabel}>
        <FormInput name='region' label='Регион РФ' className={styles.noMargin} />
        <span>
          Начните ввод названия региона и выберите из предложенных вариантов. Если Вы не из России,
          наберите «ино» и выберите вариант «Иностранец».
        </span>
      </div>
      <div className={styles.inputwithLabel}>
        <FormInput name='nasel' label='Населенный пункт' className={styles.noMargin} />
        <span>
          После выбора региона начните ввод названия Вашего населенного пункта и выберите из
          предложенных вариантов. Если в пункте «Регион РФ» Вы выбрали вариант «Иностранец», в этом
          поле нужно ввести название государства, из которого Вы прибыли.
        </span>
      </div>
    </div>
  )
}
