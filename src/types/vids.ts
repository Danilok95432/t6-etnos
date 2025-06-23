import { ImageItemWithText } from "./photos"

export type VidsResponse = {
  vids: VidItem[]
}

export type VidItemResponse = {
  vids: VidInfoResponse
}

export type VidInfoResponse = {
  id: string
  title: string
  desc: string
  rule: string
  mainphoto: ImageItemWithText[]
  photos: ImageItemWithText[]
  is_etnosport: boolean
  is_single: boolean
  is_group: boolean
  users_count: string
  groups_count: string
}

export type VidsList = {
  id: string
  title: string
  desc: string
  rule: string
  mainphoto: ImageItemWithText[]
  is_etnosport: boolean
  is_single: boolean
  is_group: boolean
  users_count: string
  groups_count: string
}

export type VidItem = {
  id: string
  title: string
  desc: string
  rule: string
  mainphoto: ImageItemWithText[]
  is_etnosport: boolean
  is_single: boolean
  is_group: boolean
  users_count: string
  groups_count: string
}

export type EtnosportSubEventItem = {
  id: string
  date: string
  mainEvent: string
  subEventTitle: string
  place: string,
  request: boolean
}

export type FunSubEventItem = {
  id: string
  date: string
  mainEvent: string
  subEventTitle: string
  place: string,
  request: boolean
}

export type VidCardItem = {
	id: string
  title: string
  desc: string
  rule: string
  mainphoto: ImageItemWithText[]
  is_etnosport: boolean
  is_single: boolean
  is_group: boolean
  users_count: string
  groups_count: string
}