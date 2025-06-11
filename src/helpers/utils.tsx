import { type LinkItem, type SourceLink } from 'src/types/global'
import { type ShortDocument } from 'src/types/document'
import { type SelOption } from 'src/types/select'
import { type DateTimeFormatOptions } from 'src/types/date'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const monthNames = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]

export const mainFormatMonthDate = (
	date: Date | string | undefined,
	dateFormat = 'dd MMMM yyyy',
): string | null => {
	if (!date) return null

	const formatedDate = typeof date === 'string' ? new Date(date) : date
	const monthIndex = formatedDate.getMonth()
	const monthName = monthNames[monthIndex]

	return `${monthName}`
}

// утилитарная функция для кастомного селекта
export const getValue = (value: string, options: SelOption[]) => {
	return value ? options.find((option) => option.value === value) : ''
}

// форматирует дату к формату - 24.03.1999

export const customFormatDate = (
	date?: string | Date,
	options: DateTimeFormatOptions = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		formatMatcher: 'best fit',
	},
	delimiter: '.' | '-' = '.',
) => {
	if (!date) return

	let formatDate: string | Date

	if (typeof date === 'string') {
		formatDate = new Date(date)
	} else {
		formatDate = date
	}

	return new Intl.DateTimeFormat('ru-RU', options).format(formatDate).replace(/\./g, delimiter)
}

// функция определения возраста по дате рождения

export const calculateAge = (birthDate?: Date | string, isDateOnly?: boolean) => {
	if (!birthDate) return null
	const now: Date = new Date()
	let parsedBirthDate: Date

	if (typeof birthDate === 'string') {
		parsedBirthDate = new Date(birthDate)
	} else {
		parsedBirthDate = birthDate
	}

	const diff: number = now.getTime() - parsedBirthDate.getTime()

	const ageDate: Date = new Date(diff)
	const age = Math.abs(ageDate.getUTCFullYear() - 1970)
	let ageString: string

	if (isDateOnly) return age.toString()

	if (age % 10 === 1 && age !== 11) {
		ageString = age.toString() + ' год'
	} else if (age % 10 >= 2 && age % 10 <= 4 && (age < 10 || age > 20)) {
		ageString = age.toString() + ' года'
	} else {
		ageString = age.toString() + ' лет'
	}

	return ageString
}

// форматирование номера телефона
export const formatPhoneNumber = (number: string) => {
	return number.replace(/[-()\s]/g, '')
}

// Форматирование ссылок на документы
export const formatDocumentLinks = (data: ShortDocument[] | undefined): LinkItem[] | undefined => {
	if (!data) return undefined
	return data.map((docItem) => ({
		id: docItem.id,
		link: docItem.link,
		titleLink: docItem.title,
		type: docItem.type,
		label: [`${docItem.type}-файл`, docItem.size],
	}))
}

// Форматирование ссылок с источником
export const formatSourceLinks = (data: SourceLink[] | undefined): LinkItem[] | undefined => {
	if (!data) return undefined
	return data.map((sourceLinkItem) => ({
		id: sourceLinkItem.id,
		link: sourceLinkItem.link,
		titleLink: sourceLinkItem.title,
		label: [mainFormatDate(sourceLinkItem.date), sourceLinkItem.source],
	}))
}

// Функция передачи кастомного класса для NavLink

export const setActive = (isActive: boolean, styles: string) => (isActive ? styles : '')

// Функция определения формата файла, принимает имя файла

export const defineFileFormat = (fileName: string) => {
	const formatFileArr = fileName.split('.')
	if (formatFileArr.length < 2) return ''
	return formatFileArr[formatFileArr.length - 1]
}

// функция форматирования даты с локализацией
export const mainFormatDate = (
	date: Date | string | undefined,
	dateFormat = 'dd MMMM yyyy',
): string | null => {
	if (!date) return null
	const formatedDate = typeof date === 'string' ? new Date(date) : date
	return format(formatedDate, dateFormat, { locale: ru })
}

export const parseTimeFromDate = (date: Date | string | undefined): string | null => {
	if (!date) return null
	const time =
		typeof date === 'string'
			? date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1]
			: date.toDateString().split('T')[1].split(':')[0] +
				':' +
				date.toDateString().split('T')[1].split(':')[1]
	return time
}

export const formatDateRange = (
	[startDate, endDate]: [Date, Date] | [],
	separator: string = '—',
	isShortMonth = false,
): string | null => {
	if (!startDate || !endDate) return null

	const startMonth = format(startDate, 'MMMM', { locale: ru })
	const endMonth = format(endDate, 'MMMM', { locale: ru })
	const startYear = format(startDate, 'yyyy', { locale: ru })
	const endYear = format(endDate, 'yyyy', { locale: ru })

	if (startYear === endYear && startMonth !== endMonth) {
		return `${format(startDate, `d ${isShortMonth ? 'LLL' : 'MMMM'}`, { locale: ru }).replace('.', '')} ${separator} ${format(endDate, `d ${isShortMonth ? 'LLL' : 'MMMM'}`, { locale: ru }).replace('.', '')}`
	}
	if (startMonth === endMonth && startYear === endYear) {
		return `${format(startDate, 'd', { locale: ru })} ${separator} ${format(endDate, `d ${isShortMonth ? 'LLL' : 'MMMM'} yyyy`, { locale: ru }).replace('.', '')}`
	}
	return `${format(startDate, `d ${isShortMonth ? 'LLL' : 'MMMM'} yyyy`, { locale: ru }).replace('.', '')} ${separator} ${format(endDate, `d ${isShortMonth ? 'LLL' : 'MMMM'} yyyy`, { locale: ru }).replace('.', '')}`
}

// Получение дня недели

export const getDayOfWeek = (date: Date) => {
	return format(date, 'EEEE', { locale: ru })
}

// функция, которая возвращает правильно склонение, в зависимости от числа

export const getCorrectWordForm = (number: number | undefined, wordForms: string[]) => {
	if (!number) return
	const cases = [2, 0, 1, 1, 1, 2]
	const wordIndex =
		number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
	return `${number} ${wordForms[wordIndex]}`
}

// получение названия месяца по индексу

export const getMonthName = (monthIdx: number) => {
	const date = new Date(2024, monthIdx)
	return date.toLocaleString('ru', { month: 'long' })
}

// форматирование даты в строку

export const formatDateToString = (date: Date): string => {
	const year = date.getUTCFullYear()
	const month = String(date.getUTCMonth() + 1).padStart(2, '0')
	const day = String(date.getUTCDate()).padStart(2, '0')
	const hours = String(date.getUTCHours()).padStart(2, '0')
	const minutes = String(date.getUTCMinutes()).padStart(2, '0')
	const seconds = String(date.getUTCSeconds()).padStart(2, '0')
	const timezoneOffset = -date.getTimezoneOffset()
	const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0')
	const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0')
	const sign = timezoneOffset >= 0 ? '+' : '-'

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`
}
