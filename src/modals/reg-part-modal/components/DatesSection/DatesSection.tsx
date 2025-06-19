import cn from 'classnames'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

export const DatesSection = () => {
  return (
    <div className={cn(styles.formSection, styles._last)}>
      <span className={styles.title}>Даты заезда и выезда</span>
      <FlexRow className={styles.groupInputs}>
        <ControlledSelect
          className={styles.selectForm}
          name='date_in'
          selectOptions={[{ label: '23 августа 2025 года', value: '0' }]}
        />
        <ControlledSelect
          className={styles.selectForm}
          name='date_out'
          selectOptions={[{ label: '25 августа 2025 года', value: '0' }]}
        />
      </FlexRow>
    </div>
  )
}
