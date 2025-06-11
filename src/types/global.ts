import { type ReactNode } from 'react'

export type LinkItem = {
	id: string
	link: string
	titleLink: string
	type?: 'doc' | 'pdf'
	label?: ReactNode | ReactNode[]
}

export type SimpleLinkType = {
	title: string
	link: string
}

export type SourceLink = {
	id: string
	title: string
	link: string
	date: Date
	source: string
}

export type MonthFilterItem = {
	date: Date
	isActive: boolean
}
export type CategoryFilterItem = {
	id: string
	title: string
}

export type FiltrationInfo = {
	months: MonthFilterItem[]
	categories: CategoryFilterItem[]
	brands: CategoryFilterItem[]
}
