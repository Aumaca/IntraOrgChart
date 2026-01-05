import { FastifyInstance } from "fastify"
import { departments, persons } from "../db/schema"
import { and, asc, eq, InferSelectModel, like, or, sql } from "drizzle-orm"
import { db } from "../db"
import { getDepartment } from "./teste"

type Department = InferSelectModel<typeof departments>
type Person = InferSelectModel<typeof persons>
export type DepartmentWithPersons = Department & { persons: Person[] }

export interface TreeData {
	department: DepartmentWithPersons
	childrenDepartments: TreeData[]
}

interface IParams {
	departmentId: string
}

export async function dataRoutes(app: FastifyInstance) {
	app.get<{ Params: IParams }>(
		"/department/:departmentId",
		async (req, rep) => {
			const idsString = (req.query as any).ids as string
			const idsToGetChildren = idsString ? idsString.split(",").map(Number) : []
			const rootDepartmentId = Number(req.params.departmentId)

			async function fetchDepartmentTree(id: number): Promise<TreeData> {
				const { department } = await getDepartment(id)
				if (!department) return department

				const childrenRows = await db
					.select({ id: departments.id })
					.from(departments)
					.where(eq(departments.parentId, id))
					.all()

				let childrenDepartments: TreeData[] = []

				const shouldExpand = idsToGetChildren.includes(id)

				if (shouldExpand && childrenRows.length > 0) {
					childrenDepartments = await Promise.all(
						childrenRows.map((child) => fetchDepartmentTree(child.id))
					)
				}

				return {
					department: department,
					childrenDepartments: childrenDepartments.filter(Boolean),
				}
			}

			const result = await fetchDepartmentTree(rootDepartmentId)

			if (!result) {
				return rep.status(404).send({ message: "Department not found" })
			}

			return result
		}
	)

	app.get("/search", async (req, rep) => {
		const { search } = req.query as { search?: string }

		if (!search) {
			return { persons: [], departments: [] }
		}

		const searchTerm = `%${search.toLowerCase()}%`

		const peopleResults = await db
			.select()
			.from(persons)
			.where(
				or(
					like(sql`lower(${persons.firstName})`, searchTerm),
					like(sql`lower(${persons.lastName})`, searchTerm),
					like(sql`lower(${persons.city})`, searchTerm)
				)
			)

		const departmentResults = await db
			.select()
			.from(departments)
			.where(
				or(
					like(sql`lower(${departments.name})`, searchTerm),
					like(sql`lower(${departments.localization})`, searchTerm)
				)
			)

		return {
			message: "search_complete",
			results: {
				persons: peopleResults,
				departments: departmentResults,
			},
		}
	})
}
