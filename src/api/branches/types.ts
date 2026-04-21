export interface ApiBranch {
	id: string
	code: string
	name: string
	description?: string
	phone1: string
	phone2?: string
	phone3?: string
	address?: string
	status: 'active' | 'inactive'
	state_id: string
	township_id: string
	state?: { id: string; name: string }
	township?: { id: string; name: string }
	open_at?: string
	close_at?: string
	is_deleted: boolean
	created_at: string
	updated_at: string
	deleted_at?: string
	created_by?: string
	updated_by?: string
	deleted_by?: string
}
