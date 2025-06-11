export type MaterialItem = {
	id: string
	title: string
	type: string
	format: 'pdf' | 'doc'
	size: string
	publicationDate: Date
	postingDate: Date
	edition: string
	coAuthors: string[]
	downloadLink: string
}
