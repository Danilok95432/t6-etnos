import { type CategoryFilterItem, type SimpleLinkType, type SourceLink } from 'src/types/global'
import { type CardNewsItem } from 'src/types/news'
import { type ImageItemWithText, type ImageItem } from 'src/types/photos'
import { type ShortDocument } from 'src/types/document'
import { type PathwayItem } from 'src/types/location'
import { type ProgramDay } from 'src/types/program'
import { type VideoItem } from 'src/types/videos'

export type EventDocumentItem = {
	id: string
	name: string
	url: string
}

export type EventPartnerItem = {
	id_partner: string
	itemlink: string
	title: string
}

export type EventItem = {
	ageRating: string
	status: 'cancel' | 'current' | 'future' | 'finished'
	description: string
	date: [Date, Date] | [Date]
	sections: string[]
	mainBrand: SimpleLinkType
	object: { id: string; title: string }
	site: SimpleLinkType
	brandImg: string
	partnerImg: string
	pathways: PathwayItem[]
	placement: PathwayItem[]
	faq: Array<{ title: string; content: string }>
	program: ProgramDay[]
	descs: string[]
	sideDocs: ShortDocument[]
	organizerLinks: SimpleLinkType[]
	partnerLinks: SimpleLinkType[]
	news: CardNewsItem[]
	videos: VideoItem[]
	photos: ImageItem[]
	relatedLinks: SourceLink[]
	documents?: EventDocumentItem[]
	partners?: EventPartnerItem[]
	raspisanie?: string
	conditions?: string
	event_type_name?: string
	event_level_name?: string
	website?: string
	contact_email?: string
	contact_telphone?: string
	contact_tg?: string
} & Omit<CardEventItem, 'date'>

export type CardEventItem = {
	id: string
	mainphoto: ImageItemWithText[]
	title: string
	status: 'cancel' | 'current' | 'future' | 'finished'
	category: CategoryFilterItem
	date: Date
	location: {
		title: string
		address: string
	}
	description: string
	brand: {
		id: string
		title: string
	}
}
