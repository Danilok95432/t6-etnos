import { ImageItemWithText } from "./photos"

export type CicleItem = {
  id: string
  cicle_name: string
  mainphoto: ImageItemWithText[]
  cicle_dates: string
  cicle_type_name: string
  cicle_short: string
  events_count: string
}

export type CiclesResponse = {
  cicles: CicleItem[]
}

export type CicleInfoResponse = {
  id: string
  cicle_name: string
  cicle_dates: string
  age: string
  url: string
  email: string
  telegram: string
  phone: string
  place: string
  anonstext: string
  fulltext: string
  mainphoto: ImageItemWithText[]
  photos: ImageItemWithText[]
  docs: {
    id: string
    title: string
  }
}

export type CardCicleItem = {
  id: string
  cicle_name: string
  mainphoto: ImageItemWithText[]
  cicle_dates: string
  cicle_type_name: string
  cicle_short: string
  events_count: string
}
