import { FastifyInstance } from "fastify"
import { departments, persons } from "../db/schema"
import { and, asc, eq, InferSelectModel, like, or, sql } from "drizzle-orm"
import { db } from "../db"

type Department = InferSelectModel<typeof departments>
type Person = InferSelectModel<typeof persons>

export async function dataRoutes(app: FastifyInstance) {
	// Get department data and their personel
	app.get("/department/:departmentId", async (req, rep) => {
		const departmentId = req.params.departmentId.toLowerCase()
		const department: Department | undefined = await db
			.select()
			.from(departments)
			.where(eq(departments.id, departmentId))
			.get()

		if (!department) {
			return rep.status(404).send({ message: "Department not found" })
		}

		const person: Person[] | undefined = await db
			.select()
			.from(persons)
			.where(eq(persons.departmentId, department?.id))
			.orderBy(asc(persons.firstName))
			.all()

		return { department: department, persons: person }
	})

	// Search
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
