import { db } from "../db"
import { DepartmentWithPersons } from "./data"
import { departments, persons } from "../db/schema"
import { asc, eq, InferSelectModel } from "drizzle-orm"

type Person = InferSelectModel<typeof persons>
type Department = InferSelectModel<typeof departments>

export async function getDepartment(
	departmentId: any
): Promise<{ department: DepartmentWithPersons }> {
	const department: Department | undefined = await db
		.select()
		.from(departments)
		.where(eq(departments.id, departmentId))
		.get()

	const personsFromDepartment: Person[] | undefined = await db
		.select()
		.from(persons)
		.where(eq(persons.departmentId, departmentId))
		.orderBy(asc(persons.firstName))
		.all()

	personsFromDepartment.forEach((person) => {
		if (person.image) {
			person.image = `${process.env.BACKEND_URL}/uploads/${person.image}`
		} else {
			person.image = ""
		}
	})

	const rawChildrenIds = await db
		.select({ id: departments.id })
		.from(departments)
		.where(eq(departments.parentId, departmentId))
		.all()

	const childrenIds: number[] = rawChildrenIds.map((row) => row.id)

	department!.childrenIds = childrenIds

	const departmentWithPersons: DepartmentWithPersons = {
		...department,
		persons: personsFromDepartment,
	}

	return { department: departmentWithPersons }
}
