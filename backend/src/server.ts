import "dotenv/config"

import Fastify, { fastify } from "fastify"
import jwt from "@fastify/jwt"
import cors from "@fastify/cors"

// Routes
import { authRoutes } from "./routes/auth"
import { userRoutes } from "./routes/users"

const app = Fastify({ logger: true })
await app.register(cors, {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE"],
})
app.register(jwt, { secret: process.env.JWT_SECRET as string })

// Routes
app.register(authRoutes, { prefix: "/auth" })
app.register(userRoutes, { prefix: "/users" })

await app.listen({ port: 3000 })
