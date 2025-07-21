import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { CarsFields } from './components/CarsFields/CarFields'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { GuestFields } from './components/GuestFields/GuestFields'
import { FC } from 'react'
import { SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'

type VisitSectionProps = {
  selectOptionsGroup?: SelOption[]
  selectOptionsLager?: SelOption[]
  selectOptionsCars?: SelOption[]
}

export const VisitSection: FC<VisitSectionProps> = ({
  selectOptionsGroup = [{ label: 'Не выбрано', value: '0' }],
  selectOptionsLager = [{ label: 'Не выбрано', value: '0' }],
  selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
}) => {
  const { control } = useFormContext()

  const useGroup = useWatch({ control, name: 'use_group' })
  const useCar = useWatch({ control, name: 'use_car' })
  const useLager = useWatch({ control, name: 'use_lager' })

  const groupDisabled = !useGroup
  const carDisabled = !useCar
  const lagerDisabled = !useLager

  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Посещение</span>

      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_group' type='checkbox' />
          <span>Семья или компания друзей</span>
        </div>
        <div className={styles.footerBox}>
          <p>Ваши личные данные указаны выше. Не нужно повторять их в составе группы.</p>
          <FlexRow className={styles.guestWrapper}>
            <FlexRow className={styles.groupGuestsInputsStart}>
              <FormInput
                name='group_name'
                label='Название группы'
                disabled={groupDisabled}
                className={styles.groupGuestInputMain}
              />
              <FlexRow className={styles.groupGuestsInputsStartInner}>
                <ControlledSelect
                  className={styles.selectForm}
                  name='id_group_type'
                  selectOptions={selectOptionsGroup}
                  disabled={groupDisabled}
                  label='Тип группы'
                />
              </FlexRow>
            </FlexRow>
            <div className={styles.guestsList}>
              <GuestFields disabled={groupDisabled} />
            </div>
          </FlexRow>
        </div>
      </div>

      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_car' type='checkbox' />
          <span>Еду на машине, нужна парковка</span>
        </div>
        <div className={styles.footerBox}>
          <FlexRow className={styles.groupInputsStart}>
            <FormInput
              name='cars_count'
              label='Кол-во'
              className={styles.shortInput}
              disabled={carDisabled}
            />
            <div className={styles.carsList}>
              <CarsFields disabled={carDisabled} selectOptionsCars={selectOptionsCars} />
            </div>
          </FlexRow>
        </div>
      </div>

      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_lager' type='checkbox' />
          <span>Нужно место в палаточном лагере</span>
        </div>
        <div className={styles.footerBox}>
          <FlexRow className={styles.groupInputs}>
            <ControlledSelect
              className={styles.selectForm}
              name='id_lager_type'
              selectOptions={selectOptionsLager}
              disabled={lagerDisabled}
              label='Лагерь'
            />
            <FormInput
              name='lager_count'
              label='Всего палаток (1 шатер равен 3 палаткам)'
              className={styles.noMargin}
              disabled={lagerDisabled}
              isSmallLabel={true}
            />
          </FlexRow>
        </div>
      </div>
    </div>
  )
}
