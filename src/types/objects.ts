import { type ImageItemWithText, type ImageItem } from 'src/types/photos'
import { type CardNewsItem } from 'src/types/news'
import { type VideoItem } from 'src/types/videos'
import { type CardEventItem } from 'src/types/events'

export type ObjectMapPaths = {
	path_name: string
	path_desc: string
	path_yandex: string
}

export type ObjectOrgItem = {
	name: string
	ogrn: string
	inn: string
	adress: string
	phone: string
}

export type ObjectItem = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	mainDesc: string
	phone: string
	email: string
	tgSoc: string
	vkSoc: string
	address: string
	photos: ImageItem[]
	descList: string[]
	events: CardEventItem[]
	news: CardNewsItem[]
	videos: VideoItem[]
	location: string
	paths: ObjectMapPaths[]
	org: ObjectOrgItem
	coords: string
}

export type ObjectsInfo = {
	description: string
	objects: ObjectItem[]
}
