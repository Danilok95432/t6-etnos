import { ParticipantItem } from "./participants";
import { ImageItemWithText } from "./photos";

export type TeamItem = {
  id: string
  logo: ImageItemWithText[]
  name: string
  region: string
  participants: string
  type: string
  registration: string
  events?: string
}