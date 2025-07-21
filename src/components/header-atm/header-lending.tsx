import styles from './index.module.scss'
import { RegEventPartModal } from 'src/modals/reg-part-modal/reg-part-modal'
import { RegEventGuestModal } from 'src/modals/reg-guest-modal/reg-guest-modal'
import { Container } from 'src/UI/Container/Container'
import { FlexRow } from '../flex-row/flex-row'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { PersonIconSvg } from 'src/UI/icons/personIconSVG'
import { useActions } from 'src/hooks/actions/actions'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { LogoLendingMobileSVG } from 'src/UI/icons/logoLendingMobileSVG'
import { LogoLendingSVG } from 'src/UI/icons/logoLendingSVG'
import { getDaysUntil, getDayWord } from 'src/helpers/utils'
import { FileLinkSVG } from 'src/UI/icons/fileLinkSVG'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const HeaderLending = () => {
  const { openModal } = useActions()
  const breakpoint = useBreakPoint()
  const daysDiff = getDaysUntil()

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1340)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className={styles.header}>
      <Container>
        <FlexRow className={styles.headerRow}>
          <Link to={'https://атманки.рф'} aria-label='Главная' title='Главная'>
            {breakpoint === 'S' ? <LogoLendingMobileSVG /> : <LogoLendingSVG />}
          </Link>
          <div className={styles.infoBlock}>
            <p className={styles.dates}>22-24 августа 2025 года</p>
            <p>
              До игр осталось: <span>{daysDiff}</span> {getDayWord(daysDiff)}
            </p>
            <p className={styles.starts}>
              Начало регистрации:
              <br /> 15 июля 2025 года
            </p>
          </div>
          {isSmallScreen ? (
            <FlexRow className={styles.controlsSmallRow}>
              <FlexRow className={styles.modalsRow}>
                <MainButton
                  className={styles.headerBtn}
                  onClick={() => openModal(<RegEventGuestModal id={'1'} />)}
                >
                  Регистрация гостей
                </MainButton>
                <MainButton
                  className={styles.headerBtn}
                  onClick={() => openModal(<RegEventPartModal id={'1'} />)}
                >
                  Регистрация участников
                </MainButton>
                <Link to={'https://lk.этноспорт.рф'} className={styles.enterLK}>
                  <div className={styles.vector}>
                    <PersonIconSvg />
                  </div>
                  <p>Войти в кабинет</p>
                </Link>
              </FlexRow>
              <FlexRow className={styles.linksRow}>
                <a href='#' className={styles.linkEl}>
                  <FileLinkSVG />
                  <span>Политика защиты и обработки персональных данных</span>
                </a>
                <a href='#' className={styles.linkEl}>
                  <FileLinkSVG />
                  <span>Правила посещения игр</span>
                </a>
              </FlexRow>
            </FlexRow>
          ) : (
            <FlexRow className={styles.controlsRow}>
              <FlexRow>
                <MainButton
                  className={styles.headerBtn}
                  onClick={() => openModal(<RegEventGuestModal id={'1'} />)}
                >
                  Регистрация гостей
                </MainButton>
                <MainButton
                  className={styles.headerBtn}
                  onClick={() => openModal(<RegEventPartModal id={'1'} />)}
                >
                  Регистрация участников
                </MainButton>
              </FlexRow>
              <Link to={'https://lk.этноспорт.рф'} className={styles.enterLK}>
                <div className={styles.vector}>
                  <PersonIconSvg />
                </div>
                <p>Войти в кабинет</p>
              </Link>
              <FlexRow className={styles.linksRow}>
                <a href='#' className={styles.linkEl}>
                  <FileLinkSVG />
                  <span>Политика защиты и обработки персональных данных</span>
                </a>
                <a href='#' className={styles.linkEl}>
                  <FileLinkSVG />
                  <span>Правила посещения игр</span>
                </a>
              </FlexRow>
            </FlexRow>
          )}
        </FlexRow>
      </Container>
    </header>
  )
}
