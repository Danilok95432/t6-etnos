import { type ImageItem, type ImageItemWithText } from './photos'

export type TraditionItem = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	desc: string
	topDesc: string
	bottomDesc: string
	photos: ImageItem[]
}
