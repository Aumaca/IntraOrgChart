import "dotenv/config"

import Fastify, { fastify } from "fastify"
import jwt from "@fastify/jwt"
import cors from "@fastify/cors"

// Routes
import { authRoutes } from "./routes/auth"
import { userRoutes } from "./routes/user"
import { dataRoutes } from "./routes/data"

const app = Fastify({ logger: false })
await app.register(cors, {
	origin: process.env.FRONTEND_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
})
app.register(jwt, { secret: process.env.JWT_SECRET as string })

// Routes
app.register(authRoutes, { prefix: "/auth" })
app.register(userRoutes, { prefix: "/users" })
app.register(dataRoutes, { prefix: "/data" })

await app.listen({ port: 3000 })
