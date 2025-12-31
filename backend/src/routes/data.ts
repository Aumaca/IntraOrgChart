import { FastifyInstance } from "fastify"
import { departments, persons } from "../db/schema"
import { and, eq, InferSelectModel, like, or, sql } from "drizzle-orm"
import { db } from "../db"

type Department = InferSelectModel<typeof departments>

export async function dataRoutes(app: FastifyInstance) {
	// Get department data and their personel
	app.get("/department/:department", async (req, rep) => {
		const departmentParam = req.params.department.toLowerCase()
		const department: Department | undefined = await db
			.select()
			.from(departments)
			.where(eq(sql`lower(${departments.name})`, departmentParam))
			.get()

		if (!department) {
			return rep.status(404).send({ message: "Department not found" })
		}

		const people = await db
			.select()
			.from(persons)
			.where(eq(persons.departmentId, department?.id))
			.all()

		console.log(department)
		console.log(people)
		return { message: "fine", department: department, people: people }
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
