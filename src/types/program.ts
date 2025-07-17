export type ProgramListItem = {
	id: string
	time: string
	place: string
	title: string
	use_reg: number
}

export type ProgramDay = {
	id: number
	date: Date
	programList: ProgramListItem[]
}

export type SubEventResponse = {
	id: string
	title: string
	itemdate: string
	begin_time: string
	use_end_time: boolean
	is_group: number
	is_etnosport: boolean
	end_time: string
	place: string
	vid: string
	use_reg: boolean
	address: string
	organizator: string
	url: string
	phone: string
	telegram: string
	email: string
	short: string
	rules: string
	reglament: string
	trebovania: string
}
