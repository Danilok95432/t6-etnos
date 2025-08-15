import { LogoTerminalSVG } from 'src/UI/icons/logoTerminalSVG'
import styles from './index.module.scss'
import { useActions } from 'src/hooks/actions/actions'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { RegEventPartModal } from 'src/modals/reg-part-modal/reg-part-modal'
import { RegEventGuestModal } from 'src/modals/reg-guest-modal/reg-guest-modal'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { LogoLendingMobileSVG } from 'src/UI/icons/logoLendingMobileSVG'
import { useNavigate } from 'react-router-dom'

export const TerminalPage = () => {
  const { openModal } = useActions()
  const breakPoint = useBreakPoint()
  const navigate = useNavigate()
  return (
    <div className={styles.terminal}>
      { breakPoint === 'S' ? <LogoLendingMobileSVG /> : <LogoTerminalSVG /> }
      <FlexRow className={styles.buttonsRow}>
        <MainButton className={styles.sendBtn} onClick={() => openModal(<RegEventGuestModal id={'1'} />)}>
          Регистрация гостей
        </MainButton>
        <MainButton className={styles.sendBtn} onClick={() => openModal(<RegEventPartModal id={'1'} />)}>
          Регистрация участников
        </MainButton>
        <FlexRow className={styles.printBlock}>
					<p>
						Если Вы уже прошли регистрацию и у Вас при себе работающий телефон, Вы можете
						распечатать Ваш билет
					</p>
					<MainButton className={styles.printBtn} onClick={() => navigate('print')}>
						Печать билета
					</MainButton>
				</FlexRow>
      </FlexRow>
    </div>
  )
}
