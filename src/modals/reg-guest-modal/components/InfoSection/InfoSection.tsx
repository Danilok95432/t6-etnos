import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'

export const InfoSection = () => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Основные данные</span>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='second' label='Фамилия' />
        <FormInput name='name' label='Имя' />
      </FlexRow>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='patr' label='Отчество' className={styles.inputWrapperContainer} />
        <FormInput name='age' label='Возраст' className={styles.shortInput} />
      </FlexRow>
      <FormInput name='email' label='Электронная почта (рекомендуется)' />
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
