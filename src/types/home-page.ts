import { type ImageItemWithText } from './photos'

export type HomePoster = {
	id: string
	title: string
	date: Date
	location: string
	mainphoto: ImageItemWithText[]
	isExternal: boolean
	itemLink: string
}

export type HomePartnerItem = {
	id: string
	mainphoto: ImageItemWithText[]
	link: string
}

export type HomeFaq = {
	id: string
	title: string
	content: string
}

export type HomeObject = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	icon: string
}
export type HomePreviewObject = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	icon: string
	mainDesc: string
	address: string
	location: string
}
