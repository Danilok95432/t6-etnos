import { FC } from 'react'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'

type InfoSectionProps = {
  isCodeAccepted?: boolean
  setIsCodeAccepted: (arg0: boolean) => void
}

export const InfoSection:FC<InfoSectionProps> = ({ isCodeAccepted, setIsCodeAccepted }) => {
  console.log(isCodeAccepted)
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Основные данные</span>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='surname' label='Фамилия' />
        <FormInput name='firstname' label='Имя' />
      </FlexRow>
      <FlexRow className={styles.groupInputs}>
        <FormInput name='fathname' label='Отчество' className={styles.inputWrapperContainer} />
        <FormInput name='age' label='Возраст' className={styles.shortInput} />
      </FlexRow>
      <FormInput name='email' label='Электронная почта' />
      <FlexRow className={styles.groupInputsStart}>
        <div className={styles.inputwithLabel}>
          <FormInput name='phone' label='Номер телефона' isPhoneWithCode={true} className={styles.noMargin} />
          <span>На этот номер поступит СМС со ссылкой на билет</span>
        </div>
        <div className={styles.inputwithLabel}>
          <FormInput name='code' isCode isCodeAccepted={isCodeAccepted} setIsCodeAccepted={setIsCodeAccepted} label='Проверочный код' className={styles.noMargin} />
          <span>Введите поступивший код для проверки номера телефона</span>
        </div>
      </FlexRow>
    </div>
  )
}
