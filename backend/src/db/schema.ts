import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const departments = sqliteTable("departments", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email"),
	localization: text("localization").notNull(),
	// manager_id: foreignKey
})

export const persons = sqliteTable("persons", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	email: text("email"),
	username: text("username"),
	telephone: text("telephone"),
	// photo: text("photo"),
	localization: text("localization").notNull(),
})
