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
	mainphoto: ImageItemWithText[]
}

export type SponsorLinksType = {
	link: string
	title: string
	mainphoto?: ImageItemWithText[]
}

export type OrganizerLinksType = {
	link: string
	title: string
	mainphotoOL?: ImageItemWithText[]
}

export type OrganizerGameLinksType = {
	link: string
	title: string
	mainphotoOG?: ImageItemWithText[]
}

export type PartnerLinksType = {
	link: string
	title: string
	mainphotoPLL?: ImageItemWithText[]
}

export type PartnerGeneralLinksType = {
	link: string
	title: string
	mainphotoGL?: ImageItemWithText[]
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
	organizerLinks: OrganizerLinksType[]
	organizerGameLinks: OrganizerGameLinksType[]
	partnerLinks: PartnerLinksType[]
	partnerGeneralLinks: PartnerGeneralLinksType[]
	sponsors: SponsorLinksType[]
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
	rules?: {
		id_event: string
		rule_name: string
		rule_text: string
		politic_name: string
		politic_text: string
	}
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
