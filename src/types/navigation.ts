import { type ReactNode } from 'react'

export type NavigationItem = {
	title: string
	link: string
	accent?: boolean
	icon?: ReactNode
	childItems?: NavigationItem[]
	exact?: boolean
}

export type ContentNav = {
	linkIdx: number
}

export type TabNavigationItem = {
	title: string
	link: string
	exact?: boolean
	end?: boolean
}
