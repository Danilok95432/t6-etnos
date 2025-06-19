import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import styles from '../../index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { CarsFields } from '../CarsFields/CarsFields'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

export const PartSection = () => {
  return (
    <div className={styles.formSection}>
      <span className={styles.title}>Участие</span>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='sportsmen' type='checkbox' />
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
          <ControlledCheckbox name='folklor' type='checkbox' />
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
          <ControlledCheckbox name='torg' type='checkbox' />
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
          <ControlledCheckbox name='master' type='checkbox' />
          <span>Я — мастер народных промыслов и ремесел</span>
        </div>
        <div className={styles.footerBox}>
          <FormInput name='namePromis' label='Название промысла' className={styles.noMargin} />
        </div>
      </div>
      <div className={styles.checkBoxWrapper}>
        <div className={styles.headBox}>
          <ControlledCheckbox name='jurnal' type='checkbox' />
          <span>Я — журналист</span>
        </div>
        <div className={styles.footerBox}>
          <FormInput
            name='nameIzd'
            label='Название издания, студии или канала'
            className={styles.noMargin}
          />
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
              name='palatk'
              label='Всего палаток (1 шатер равен 3 палаткам)'
              className={styles.noMargin}
            />
          </FlexRow>
        </div>
      </div>
    </div>
  )
}
