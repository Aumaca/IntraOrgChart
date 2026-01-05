import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const departments = sqliteTable("departments", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email"),
	localization: text("localization").notNull(),
	managerId: integer("manager_id").references(() => persons.id),
	parentId: integer("parent_id").references(() => departments.id),
})

export const persons = sqliteTable("persons", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	role: text("role").notNull(),
	email: text("email"),
	username: text("username"),
	telephone: text("telephone"),
	image: text("image"),
	continent: text("continent"),
	country: text("country"),
	state: text("state"),
	city: text("city"),
	departmentId: integer("department_id").references(() => departments.id),
})

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	role: text("role"),
})
