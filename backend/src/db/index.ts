import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import * as schema from "./schema.ts"

const client = createClient({
	url: "file:local.db", // Isso cria o arquivo local.db na raiz do projeto
})

export const db = drizzle(client, { schema })
