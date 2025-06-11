import { type ImageItem, type ImageItemWithText } from './photos'

export type GameItem = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	desc: string
	topDesc: string
	bottomDesc: string
	photos: ImageItem[]
}
