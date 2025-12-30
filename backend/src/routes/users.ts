import { FastifyInstance } from "fastify"

export async function userRoutes(app: FastifyInstance) {
	app.get("/", async () => {
		return { users: [] }
	})

	app.post("/login", async () => {
		return "login"
	})
}
