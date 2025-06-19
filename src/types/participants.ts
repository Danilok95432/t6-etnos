import { ImageItemWithText } from './photos'

export type ParticipantResponse = {
  reg_users: ParticipantItem[]
}

export type ParticipantItem = {
  id: string
  photo: ImageItemWithText[]
  fathname: string
  firstname: string
  surname: string
  region_name: string
  age: string
  group_name: string
  user_roles: {
    id: string
    title: string
  }[]
  birthdate: string
  createdate: string
}

export type ParticipantGroup = {
  id: string
  name: string
  role: string
  category: string
  participants: string
  subgroup: string
  rating: string
}
