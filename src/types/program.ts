export type ProgramListItem = {
	id: string
	time: string
	place: string
	title: string
}

export type ProgramDay = {
	id: number
	date: Date
	programList: ProgramListItem[]
}
