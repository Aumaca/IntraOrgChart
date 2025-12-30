import { db } from "../db"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { users } from "../db/schema"
import { FastifyInstance } from "fastify"

export async function authRoutes(app: FastifyInstance) {
	app.post("/login", async (req, rep) => {
		const { email, password } = req.body as any

		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.get()

		const isPasswordValid = await bcrypt.compare(password, user?.password || "")
		if (!user || !isPasswordValid)
			return rep.status(401).send({ message: "Email or password invalid" })

		const token = app.jwt.sign({
			id: user.id,
			email: user.email,
		})

		return {
			message: "User authenticated successfully",
			token: token,
		}
	})

	app.post("/register", async (req, rep) => {
		const { firstName, lastName, email, password, role } = req.body as any

		const userExists = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.get()

		if (userExists) {
			return rep.status(400).send({ message: "User already exists" })
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		await db.insert(users).values({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		})

		return rep.status(201).send({ message: "User created successfully" })
	})
}
