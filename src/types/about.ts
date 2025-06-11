import { type ImageItemWithText } from 'src/types/photos'

export type AboutGeneralPage = {
	logo: string
	caption: string
	caption_show: boolean
	mainDescs: string[]
	descs: string[]
	photoGallery: ImageItemWithText[]
	mainphoto: ImageItemWithText[]
}
export type AboutHistoryPage = {
	topDescs: string[]
	mainPhoto: ImageItemWithText[]
	photos: ImageItemWithText[]
	bottomDescs: string[]
}

export type AboutNaturePage = {
	topDescs: string[]
	mainPhoto: ImageItemWithText[]
	photos: ImageItemWithText[]
	bottomDescs: string[]
}

type ShortCultureElement = {
	id: string
	title: string
	desc: string
}

type ShortTraditionElement = {
	id: string
	title: string
	desc: string
}

type ShortGameElement = {
	id: string
	title: string
	desc: string
}

export type AboutCulturePage = {
	topDesc: string
	bottomDesc: string
	photoGallery: ImageItemWithText[]
	cultures: ShortCultureElement[]
}

export type AboutTraditionPage = {
	topDesc: string
	bottomDesc: string
	photoGallery: ImageItemWithText[]
	traditions: ShortTraditionElement[]
}

export type AboutGamesPage = {
	topDesc: string
	bottomDesc: string
	photoGallery: ImageItemWithText[]
	games: ShortGameElement[]
	mainVideo: string
}

export type PhoneContacts = {
	contact: string
	phoneNumber: {
		formatNumber: string
		number: string
	}
}

export type EmailContacts = {
	contact: string
	email: string
}

export type AboutContactsPage = {
	map_coords: [number, number]
	mailAddress: string
	phone: PhoneContacts[]
	emails: EmailContacts[]
	photos: ImageItemWithText[]
	topDesc: string
}
