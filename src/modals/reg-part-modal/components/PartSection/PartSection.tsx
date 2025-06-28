import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { FC } from 'react'
import { SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'

type PartSectionProps = {
  selectOptionsCars?: SelOption[]
  selectOptionsLager?: SelOption[]
}

export const PartSection: FC<PartSectionProps> = ({
  selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
  selectOptionsLager = [{ label: 'Не выбрано', value: '0' }],
}) => {
  const { control } = useFormContext()
  
  const useMaster = useWatch({ control, name: 'use_master' })
  const useJournalist = useWatch({ control, name: 'use_journalist' })
  const useCar = useWatch({ control, name: 'use_car' })
  const useLager = useWatch({ control, name: 'use_lager' })

  const masterDisabled = !useMaster
  const journalistDisabled = !useJournalist
  const carsDisabled = !useCar
  const lagerDisabled = !useLager
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Участие</span>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_sportsmen' type='checkbox' />
          <span>Я — спортсмен</span>
        </div>
        <div className={styles.footerBox}>
          <p>
            Регистрация на состязания этноспорта и отдельных спортсменов и спортивной ватаги
            возможна только через личный кабинет. Ссылка на личный кабинет будет прислана Вам после
            завершения регистрации в качестве участника основного события.
          </p>
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_folk' type='checkbox' />
          <span>Я — участник фольклорной программы</span>
        </div>
        <div className={styles.footerBox}>
          <p>
            Регистрация фольклорных коллективов возможная только через личный кабинет. Ссылка на
            личный кабинет будет прислана Вам после завершения регистрации в качестве участника
            основного события.
          </p>
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_trader' type='checkbox' />
          <span>Я торгую на ярмарке.</span>
        </div>
        <div className={styles.footerBox}>
          <p>
            Для того, чтобы подтвердить Ваше участие в ярмарке в качестве торговца, с Вами свяжется
            представитель организаторов.
          </p>
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_master' type='checkbox' />
          <span>Я — мастер народных промыслов и ремесел</span>
        </div>
        <div className={styles.footerBox}>
          <FormInput name='master_name' label='Название промысла' className={styles.noMargin} disabled={masterDisabled} />
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_journalist' type='checkbox' />
          <span>Я — журналист</span>
        </div>
        <div className={styles.footerBox}>
          <FormInput
            name='journal_name'
            label='Название издания, студии или канала'
            className={styles.noMargin}
            disabled={journalistDisabled}
          />
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='use_car' type='checkbox' />
          <span>Еду на машине, нужна парковка</span>
        </div>
        <div className={styles.footerBox}>
          <FlexRow className={styles.groupInputsStart}>
            <div className={styles.carsList}>
              <ControlledSelect
                className={styles.selectForm}
                name={`id_car_type`}
                selectOptions={selectOptionsCars}
                disabled={carsDisabled}
              />
              <FormInput name={`car_number`} label='Госномер' disabled={carsDisabled} />
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
            />
            <FormInput
              name='lager_count'
              label='Всего палаток (1 шатер равен 3 палаткам)'
              className={styles.noMargin}
              disabled={lagerDisabled}
            />
          </FlexRow>
        </div>
      </div>
    </div>
  )
}
