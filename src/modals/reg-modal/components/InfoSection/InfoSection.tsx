import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'

export const InfoSection = () => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Основные данные</span>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='second' label='Фамилия' />
        <FormInput name='first' label='Имя' />
      </FlexRow>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='part' label='Отчество' />
        <ControlledDateInput name='date' dateFormat='dd.MM.YYYY' placeholder='Дата рождения' className={styles.adminDateInput} />
      </FlexRow>
      <FormInput name='email' label='Электронная почта' />
      <FlexRow className={styles.groupInputsStart}>
        <div className={styles.inputwithLabel}>
          <FormInput name='phone' label='Номер телефона' isPhoneWithCode={true} className={styles.noMargin} />
          <span>На этот номер поступит СМС со ссылкой на билет</span>
        </div>
        <div className={styles.inputwithLabel}>
          <FormInput name='password' label='Проверочный код' className={styles.noMargin} />
          <span>Введите поступивший код для проверки номера телефона</span>
        </div>
      </FlexRow>
    </div>
  )
}
