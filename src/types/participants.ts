import { ImageItemWithText } from "./photos";

export type ParticipantItem = {
  id: string,
  photo: ImageItemWithText[],
  name: string,
  region: string,
  age: string,
  group: string,
  type: string[],
  registration: string,
}