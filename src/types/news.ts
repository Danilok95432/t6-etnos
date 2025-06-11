import { type CategoryFilterItem } from 'src/types/global'
import { type ImageItemWithText, type ImageItem } from 'src/types/photos'

export type NewsItem = {
	id: string
	title: string
	date: Date
	imgGallery: ImageItem[]
	mainphoto: ImageItemWithText[]
	textNews: string[]
	full: string
	short: string
	main: boolean
}

export type CardNewsItem = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	date: Date
	desc: string
	main: boolean
	category: CategoryFilterItem
}
