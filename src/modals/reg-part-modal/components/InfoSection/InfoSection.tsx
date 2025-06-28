import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { FC } from 'react'

type InfoSectionProps = {
  setIsCodeAccepted: (arg0: boolean) => void
}

export const InfoSection:FC<InfoSectionProps> = ({ setIsCodeAccepted }) => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Основные данные</span>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='surname' label='Фамилия' />
        <FormInput name='firstname' label='Имя' />
      </FlexRow>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='fathname' label='Отчество' className={styles.inputWrapperContainer} />
        <ControlledDateInput name='birthdate' dateFormat='dd.MM.YYYY' placeholder='Дата рождения' className={styles.adminDateInput} />
      </FlexRow>
      <FormInput name='email' label='Электронная почта' />
      <FlexRow className={styles.groupInputsStart}>
        <div className={styles.inputwithLabel}>
          <FormInput name='phone' label='Номер телефона' isPhoneWithCode={true} className={styles.noMargin} />
          <span>На этот номер поступит СМС со ссылкой на билет</span>
        </div>
        <div className={styles.inputwithLabel}>
          <FormInput name='code' label='Проверочный код' isCode setIsCodeAccepted={setIsCodeAccepted} className={styles.noMargin} />
          <span>Введите поступивший код для проверки номера телефона</span>
        </div>
      </FlexRow>
    </div>
  )
}
