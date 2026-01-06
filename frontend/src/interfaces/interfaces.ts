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
	id: number
	name: string
	localization: string
	email: string
	managerId: number
	parentId: number
	persons: Person[]
	childrenIds: number[]
}

export interface TreeData {
	department: Department
	childrenDepartments: TreeData[]
}