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


type ShortGameElement = {
	id: string
	title: string
	desc: string
}

type ShortTraditionElement = {
	id: string
	title: string
	desc: string
}
