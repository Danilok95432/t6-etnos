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

export type EtnosportCardItem = {
	id: string
	photo: ImageItemWithText[]
	title: string
	type: string
	teams: string
	participants: string
}
