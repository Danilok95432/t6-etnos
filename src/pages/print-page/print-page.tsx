import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { RegEventGuestModal } from 'src/modals/reg-guest-modal/reg-guest-modal'
import { RegEventPartModal } from 'src/modals/reg-part-modal/reg-part-modal'
import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { checkInputs, checkSchema } from './schema'
import { LogoTerminalSVG } from 'src/UI/icons/logoTerminalSVG'
import { LogoLendingMobileSVG } from 'src/UI/icons/logoLendingMobileSVG'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { useActions } from 'src/hooks/actions/actions'

export const PrintPage = () => {
	const { openModal } = useActions()
	const breakPoint = useBreakPoint()
	const navigate = useNavigate()
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [ticketUrl, setTicketUrl] = useState<string>('')

	const methods = useForm<checkInputs>({
		mode: 'onBlur',
		resolver: yupResolver(checkSchema),
	})

	const {
		formState: { errors },
	} = methods

	const onSubmit: SubmitHandler<checkInputs> = async (data) => {
		console.log(data)
	}

	return (
		<div className={styles.printPage}>
			{breakPoint === 'S' ? <LogoLendingMobileSVG /> : <LogoTerminalSVG />}
			<p className={styles.desc}>
				Здесь Вы можете распечатать билет, полученный Вами при регистрации. Для этого нужно ввести
				номер Вашего телефона и подтвердить его при помощи кода, присланного в СМС.
			</p>
			<FlexRow className={styles.formRow}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
						<div className={styles.inputwithLabel}>
							<FormInput
								name='phone'
								label='Номер телефона'
								isPhoneWithCode={true}
								className={styles.noMargin}
								isCodeAccepted={isCodeAccepted}
								sendCodeClass={styles.sendCode}
								setTicketUrl={setTicketUrl}
							/>
							{errors.phone && <p className={styles.warningMessage}>Неверный формат телефона</p>}
							<span className={styles.phoneSpan}>Номер, указанный Вами при регистрации</span>
						</div>
						<div className={styles.inputwithLabel}>
							<FormInput
								name='code'
								label='Проверочный код'
								isCode
								isCodeAccepted={isCodeAccepted}
								setIsCodeAccepted={setIsCodeAccepted}
								className={styles.noMargin}
							/>
							{!isCodeAccepted && errors.code && (
								<p className={styles.warningMessage}>Неверный код</p>
							)}
							<span className={styles.phoneSpan}>
								Введите поступивший код для проверки номера телефона
							</span>
						</div>
					</form>
				</FormProvider>
			</FlexRow>
      {
        isCodeAccepted && ticketUrl === '' && (
          <FlexRow className={styles.printBlock}>
					<p className={styles.error}>
						Внимание! К указанному номеру не привязано ни одного билета. Пройдите, пожалуйста,
						регистрацию
					</p>
					<FlexRow className={styles.regBtns}>
						<MainButton
							className={styles.sendBtn}
							onClick={() => openModal(<RegEventGuestModal id={'1'} />)}
						>
							Регистрация гостей
						</MainButton>
						<MainButton
							className={styles.sendBtn}
							onClick={() => openModal(<RegEventPartModal id={'1'} />)}
						>
							Регистрация участников
						</MainButton>
					</FlexRow>
				</FlexRow>
        )
      }
			{isCodeAccepted && ticketUrl !== '' && (
				<FlexRow className={styles.printBlock}>
					<p>Ваш билет найден. Можете его просмотреть и распечатать</p>
					<MainButton className={styles.printBtn} onClick={() => navigate(ticketUrl)}>
						Показать билет
					</MainButton>
				</FlexRow>
			)}
		</div>
	)
}
