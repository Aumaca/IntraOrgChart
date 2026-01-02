export interface Person {
	id: string
	firstName: string
	lastName: string
	role: string
	email: string
	username: string
	telephone: string
	image: string
	continent: string
	country: string
	state: string
	city: string
	departmentId: string
}

export interface Department {
	id: string
	name: string
	localization: string
	email: string
	managerId: string
}

export type TreeDataResult = Record<string, Department | Person[]>

export interface TreeData {
	department: Department
	persons: Person[]
}