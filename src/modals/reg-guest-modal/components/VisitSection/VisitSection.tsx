import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { CarsFields } from './components/CarsFields/CarFields'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { GuestFields } from './components/GuestFields/GuestFields'

export const VisitSection = () => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Посещение</span>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='car' type='checkbox' />
          <span>Семья или компания друзей</span>
        </div>
        <div className={styles.footerBox}>
          <p>Ваши личные данные указаны выше. Не нужно повторять их в составе группы.</p>
          <FlexRow className={styles.guestWrapper}>
            <FlexRow className={styles.groupGuestsInputsStart}>
              <FormInput name='name_group' label='Название группы' />
              <ControlledSelect
                className={styles.selectForm}
                name='camp'
                selectOptions={[{ label: 'Семья', value: '0' }]}
              />
              <FormInput name='count_guests' label='Всего' className={styles.shortInput} />
            </FlexRow>
            <div className={styles.guestsList}>
              <GuestFields />
            </div>
          </FlexRow>
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='car' type='checkbox' />
          <span>Еду на машине, нужна парковка</span>
        </div>
        <div className={styles.footerBox}>
          <FlexRow className={styles.groupInputsStart}>
            <FormInput name='count_ts' label='Кол-во' className={styles.shortInput} />
            <div className={styles.carsList}>
              <CarsFields />
            </div>
          </FlexRow>
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='place' type='checkbox' />
          <span>Нужно место в палаточном лагере</span>
        </div>
        <div className={styles.footerBox}>
          <FlexRow className={styles.groupInputs}>
            <ControlledSelect
              className={styles.selectForm}
              name='camp'
              selectOptions={[{ label: 'Лагерь участников', value: '0' }]}
            />
            <FormInput
              name='nephone'
              label='Всего палаток (1 шатер равен 3 палаткам)'
              className={styles.noMargin}
            />
          </FlexRow>
        </div>
      </div>
    </div>
  )
}
