import { FormProvider, type SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'

import styles from './index.module.scss'
import { LogoModalSVG } from 'src/UI/icons/logoModalSVG'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { FC, useEffect, useRef, useState } from 'react'
import { RegInputs, regSchema } from './schema'
import { useGetEventByIdQuery } from 'src/store/events/events.api'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'
import { CustomText } from 'src/components/custom-text/custom-text'
import {
  booleanToNumberString,
  formatDateRange,
  formatDateToYYYYMMDD,
  mainFormatDate,
  transformToFormData,
} from 'src/helpers/utils'
import cn from 'classnames'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { InfoSection } from './components/InfoSection/InfoSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { DatesSection } from './components/DatesSection/DatesSection'
import { PartSection } from './components/PartSection/PartSection'
import { useParams } from 'react-router-dom'
import {
  useCheckRegistrationCodeMutation,
  useGetCityByRegionQuery,
  useGetInfoRegistationQuery,
  useGetRegionsByValueQuery,
  useSendRegistrationFormMutation,
} from 'src/store/auth/auth.api'
import { toast } from 'react-toastify'
import { LogoModalMobileSVG } from 'src/UI/icons/logoModalMobileSVG'
import { AppRoute } from 'src/routes/main-routes/consts'

type RegEventPartModalProps = {
	id: string
}

export const RegEventPartModal: FC<RegEventPartModalProps> = ({ id }) => {
	const { closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const { data: eventDataInfo } = useGetEventByIdQuery('1')
	const { data: selectOptions } = useGetInfoRegistationQuery('1')
	const { data: regions } = useGetRegionsByValueQuery('')
	const [saveRegForm] = useSendRegistrationFormMutation()
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [errorForm, setErrorForm] = useState<string>('')
	const breakPoint = useBreakPoint()

	const methods = useForm<RegInputs>({
		mode: 'onBlur',
		resolver: yupResolver(regSchema),
	})

	const [lockSearch, setLockSearch] = useState<boolean>(false)

	const regionValue = useWatch({
		control: methods.control,
		name: 'id_region',
	})

	const cityValue =
		useWatch({
			control: methods.control,
			name: 'id_city',
		}) || ''

	const regionId = regions?.regions?.find((reg) => reg.label === regionValue)?.value

	const { data: citys } = useGetCityByRegionQuery(
		{
			region: regionId ?? '',
			city: cityValue,
		},
		{
			skip: !regionId || cityValue.length <= 2 || lockSearch,
		},
	)

	const onSubmit: SubmitHandler<RegInputs> = async (data) => {
		const region = regions?.regions?.filter((reg) => reg.label === data.id_region)[0].value
		const city = citys?.citys?.filter((nas) => nas.label === data.id_city)[0].value
		let selectedObjEtno = ''
		let selectedObjFun = ''
		if (typeof data.etno_list !== 'string' && data.etno_list) {
			selectedObjEtno = data.etno_list
				.filter((opt) => opt.selected)
				.map((opt) => opt.value)
				.join(',')
		}
		if (typeof data.fun_list !== 'string' && data.fun_list) {
			selectedObjFun = data.fun_list
				.filter((opt) => opt.selected)
				.map((opt) => opt.value)
				.join(',')
		}
		const formData = new FormData()
		formData.append('id_reg_type', '1')
		formData.append('id_event', id)
		formData.append('surname', data.surname)
		formData.append('firstname', data.firstname)
		formData.append('fathname', data.fathname ?? '')
		formData.append('birthdate', data.birthdate ?? '')
		formData.append('id_region', region ?? '')
		formData.append('id_city', city ?? '')
		formData.append('phone', data.phone)
		formData.append('email', data.email ?? '')

		// Групповые данные
		formData.append('use_group', booleanToNumberString(data.use_group))
		formData.append('group_name', data.group_name ?? '')
		formData.append('id_event_role', data.id_event_role ?? '')
		formData.append('group_count', data.group_list?.length.toString() ?? '0')

		// Данные участников группы
		data.group_list?.forEach((group, index) => {
			formData.append(`group_list_age[${index}]`, group.age ?? '')
			formData.append(`group_list_surname[${index}]`, group.surname ?? '')
			formData.append(`group_list_firstname[${index}]`, group.firstname ?? '')
			formData.append(`group_list_fathname[${index}]`, group.fathname ?? '')
		})

		// Данные лагеря
		formData.append('use_lager', booleanToNumberString(data.use_lager))
		formData.append('id_lager_type', data.id_lager_type ?? '')
		formData.append('lager_count', data.lager_count?.toString() ?? '0')
		formData.append('data_zaezd', data.data_zaezd ?? '')
		formData.append('data_viezd', data.data_viezd ?? '')

		// Данные спортсменов и активности
		formData.append('use_sportsmen', booleanToNumberString(data.use_sportsmen))
		formData.append(
			'etno_list',
			typeof data.etno_list === 'string' ? data.etno_list : data.etno_list ? selectedObjEtno : '0',
		)
		formData.append(
			'fun_list',
			typeof data.fun_list === 'string' ? data.fun_list : data.fun_list ? selectedObjFun : '0',
		)

		// Специальные категории
		formData.append('use_folk', booleanToNumberString(data.use_folk))
		formData.append('use_trader', booleanToNumberString(data.use_trader))
		formData.append('use_master', booleanToNumberString(data.use_master))
		formData.append('master_name', data.master_name ?? '')
		formData.append('use_journalist', booleanToNumberString(data.use_journalist))
		formData.append('journal_name', data.journal_name ?? '')

		// Данные транспорта
		formData.append('use_car', booleanToNumberString(data.use_car))
		formData.append('id_car_type', data.id_car_type ?? '')
		formData.append('car_number', data.car_number ?? '')
		try {
			if (isCodeAccepted) {
				if (city === '' || city === undefined) {
					formData.append('city_name', data.id_city)
				}
				const res = (await saveRegForm(formData)) as unknown as {
					data: { status: string; errortext: string }
				}
				if (res.data.status === 'ok') {
					toast.success('Регистрация прошла успешно!', {
						position: 'bottom-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					closeModal()
				} else {
					toast.error('Произошла ошибка при регистрации', {
						position: 'bottom-right',
					})
					setErrorForm(res.data.errortext)
				}
			}
		} catch (error) {
			console.error('Unexpected error:', error)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth < 768) return

			const modalEl = modalRef.current
			const target = event.target as HTMLElement

			if (!modalEl || modalEl.contains(target)) return

			const { clientX, clientY } = event
			const windowWidth = window.innerWidth
			const windowHeight = window.innerHeight
			const scrollbarSize = 16
			const isClickOnScrollbar =
				clientX >= windowWidth - scrollbarSize || clientY >= windowHeight - scrollbarSize

			if (isClickOnScrollbar) return

			closeModal()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [closeModal])

	return (
		<div className={styles.regModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					{breakPoint === 'S' ? <LogoModalMobileSVG /> : <LogoModalSVG />}
					<h2>{eventDataInfo?.title}</h2>
					<FlexRow className={styles.eventInfoLine}>
						<p className={styles.infoString}>
							{eventDataInfo?.date && eventDataInfo.date.length > 1
								? formatDateRange(eventDataInfo?.date as [Date, Date])
								: mainFormatDate(eventDataInfo?.date[0])}
						</p>
						<div className={styles.dot}></div>
						<p className={styles.infoString}>{eventDataInfo?.location.address.split(',')[0]}</p>
						<div className={cn(styles.dot, styles._red)}></div>
						<p className={cn(styles.ageRating, styles.infoString)}>{eventDataInfo?.ageRating}+</p>
					</FlexRow>
					<FlexRow className={styles.disclaimer}>
						<span className={styles.title}>Регистрация участника</span>
						<div className={styles.grayBox}>
							<p>
								Регистрация гостей и участников события строго обязательна. Это — требования
								безопасности.
							</p>
						</div>
					</FlexRow>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
							<InfoSection
								setIsCodeAccepted={setIsCodeAccepted}
								isCodeAccepted={isCodeAccepted}
								errorForm={errorForm}
								setErrorForm={setErrorForm}
							/>
							<RegionSection
								regions={regions?.regions}
								citys={citys?.citys}
								setLockSearch={setLockSearch}
								lockSearch={lockSearch}
							/>
							<PartSection
								selectOptionsCars={selectOptions?.car_types}
								selectOptionsLager={selectOptions?.lager_types}
								selectOptionsGroup={selectOptions?.event_roles}
								etnoList={selectOptions?.etnosport}
								funList={selectOptions?.zabavy}
							/>
							<DatesSection selectOptions={selectOptions?.dates} />
							<FlexRow className={cn(styles.disclaimer, styles._last)}>
								<div className={styles.grayBox}>
									<p>
										Внимание! Завершение регистрации означает согласие с{' '}
										<a href={`https://этноспорт.рф/events/1/docs`}>
											Политикой защиты и обработки персональных данных
										</a>{' '}
										и <a href={`https://этноспорт.рф/events/1/rules`}>Правилами посещения игр</a>.
									</p>
								</div>
							</FlexRow>
							<MainButton type='submit' disabled={!isCodeAccepted}>
								Завершить регистрацию
							</MainButton>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}
