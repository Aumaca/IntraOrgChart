require("dotenv").config()

import Fastify from "fastify"
import jwt from "@fastify/jwt"

// Routes
import { authRoutes } from "./routes/auth"
import { userRoutes } from "./routes/users"

const app = Fastify({ logger: true })
app.register(jwt, { secret: process.env.JWT_SECRET as string })

// Routes
app.register(authRoutes, { prefix: "/auth" })
app.register(userRoutes, { prefix: "/users" })
