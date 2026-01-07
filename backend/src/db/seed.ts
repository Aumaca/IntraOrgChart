import { sql, eq } from "drizzle-orm"
import { db } from "./index"
import { departments, persons, users } from "./schema"

async function seed() {
	console.log("Seeding admin user")

	await db
		.insert(users)
		.values([
			{
				firstName: "admin",
				lastName: "admin",
				email: "admin@admin.com",
				password:
					"$2a$12$Z9Isz1GPOHf0Wn8GaGANSe/lb.r.BjeZcn4T2Iqk1/pPuA.0aDet6",
				role: "admin",
			},
		])
		.onConflictDoUpdate({
			target: users.id,
			set: {
				firstName: sql`excluded.first_name`,
				lastName: sql`excluded.last_name`,
				email: sql`excluded.email`,
				password: sql`excluded.password`,
				role: sql`excluded.role`,
			},
		})

	console.log("Seeding Steins;Gate characters and departments...")

	await db
		.insert(departments)
		.values([
			{
				id: 1,
				name: "Future Gadget Laboratory",
				localization: "Tokyo",
				managerId: null,
				parentId: null,
			},
			{
				id: 2,
				name: "Viktor Chondria University",
				localization: "Ohio",
				managerId: null,
				parentId: null,
			},
			{
				id: 3,
				name: "DURPA High Command",
				localization: "Washington D.C.",
				managerId: null,
				parentId: null,
			},
			{
				id: 4,
				name: "Strategic Operations Group (SOG)",
				localization: "Secret Location",
				managerId: null,
				parentId: 3,
			},
		])
		.onConflictDoUpdate({
			target: departments.id,
			set: {
				name: sql`excluded.name`,
				localization: sql`excluded.localization`,
			},
		})

	await db
		.insert(persons)
		.values([
			{
				id: 1,
				firstName: "Rintaro",
				lastName: "Okabe",
				role: "Lab Member 001",
				email: "okabe@futuregadget.com",
				username: "HououinKyouma",
				telephone: "090-XXX-XXXX",
				image: "rintaro.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Kurisu",
				lastName: "Makise",
				role: "Lab Member 004",
				email: "kurisu@victor-chondria.edu",
				username: "Christina",
				telephone: null,
				image: "kurisu.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Mayuri",
				lastName: "Shiina",
				role: "Lab Member 002",
				email: "mayuri@futuregadget.com",
				username: "Mayushii",
				telephone: null,
				image: "mayuri.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Itaru",
				lastName: "Hashida",
				role: "Lab Member 003",
				email: "daru@futuregadget.com",
				username: "Daru",
				telephone: null,
				image: "Itaru.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Moeka",
				lastName: "Kiryu",
				role: "Lab Member 005",
				email: "moeka@shining-finger.com",
				username: "ShiningFinger",
				telephone: null,
				image: "moeka.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Luka",
				lastName: "Urushibara",
				role: "Lab Member 006",
				email: "luka@yanabayashi.com",
				username: "Lukako",
				telephone: null,
				image: "luka.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Faris",
				lastName: "NyanNyan",
				role: "Lab Member 007",
				email: "faris@mayqueen.com",
				username: "Faris",
				telephone: null,
				image: "faris.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Suzuha",
				lastName: "Amane",
				role: "Lab Member 008",
				email: "suzuha@future.com",
				username: "PartTimeWarrior",
				telephone: null,
				image: "suzuha.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				id: 9,
				firstName: "Maho",
				lastName: "Hiyajo",
				role: "Senior Researcher",
				email: "maho@victor-chondria.edu",
				username: "HiyajoSafina",
				telephone: "1-555-0199",
				image: "maho.png",
				continent: "North America",
				country: "USA",
				state: "Ohio",
				city: "Columbus",
				departmentId: 2,
			},
			{
				id: 10,
				firstName: "Alexis",
				lastName: "Leskinen",
				role: "Professor",
				email: "leskinen@victor-chondria.edu",
				username: "Leskinen",
				telephone: "1-555-0100",
				image: "alexis.png",
				continent: "North America",
				country: "USA",
				state: "Ohio",
				city: "Columbus",
				departmentId: 2,
			},
			{
				id: 11,
				firstName: "Judy",
				lastName: "Reyes",
				role: "Associate Professor",
				email: "reyes@victor-chondria.edu",
				username: "ProfReyes",
				telephone: "1-555-0123",
				image: "judy.png",
				continent: "North America",
				country: "USA",
				state: "Ohio",
				city: "Columbus",
				departmentId: 2,
			},
			{
				id: 12,
				firstName: "Kagari",
				lastName: "Shiina",
				role: "Test Subject",
				email: "kagari@unknown.net",
				username: "Kagari",
				telephone: null,
				image: "kagari.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 2,
			},
			{
				id: 13,
				firstName: "Shouichi",
				lastName: "Makise",
				role: "Guest Lecturer",
				email: "nakabachi@conf.org",
				username: "DrNakabachi",
				telephone: "090-XXX-BADD",
				image: "shouichi.png",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 2,
			},
			{
				id: 14,
				firstName: "The",
				lastName: "President",
				role: "POTUS",
				email: "potus@whitehouse.gov",
				username: "CommanderInChief",
				telephone: "1-202-456-1111",
				continent: "North America",
				country: "USA",
				state: "Washington D.C.",
				city: "Washington",
				departmentId: 3,
			},
			{
				firstName: "General",
				lastName: "Carter",
				role: "DURPA Director",
				email: "director@durpa.mil",
				username: "WarHawk",
				telephone: "1-703-555-0001",
				continent: "North America",
				country: "USA",
				state: "Virginia",
				city: "Arlington",
				departmentId: 3,
			},
			{
				firstName: "Agent",
				lastName: "Smith",
				role: "Black Ops Handler",
				email: "classified@unknown.gov",
				username: "MIB_01",
				telephone: null,
				continent: "North America",
				country: "USA",
				state: "Unknown",
				city: "Unknown",
				departmentId: 3,
			},
			{
				id: 17,
				firstName: "Colonel",
				lastName: "Reyes",
				role: "Tactical Lead",
				email: "reyes.tactical@durpa.mil",
				username: "IronSights",
				telephone: "1-703-555-9999",
				continent: "North America",
				country: "USA",
				state: "Virginia",
				city: "Arlington",
				departmentId: 4,
			},
		])
		.onConflictDoUpdate({
			target: persons.id,
			set: { firstName: sql`excluded.first_name` },
		})

	await db
		.update(departments)
		.set({ managerId: 1, parentId: 4 })
		.where(eq(departments.id, 1))

	await db
		.update(departments)
		.set({ managerId: 10, parentId: 3 })
		.where(eq(departments.id, 2))

	await db
		.update(departments)
		.set({ managerId: 14 })
		.where(eq(departments.id, 3))

	await db
		.update(departments)
		.set({ managerId: 17 })
		.where(eq(departments.id, 4))

	console.log("Seeding complete")
}

seed().catch((err) => {
	console.error("Seeding failed", err)
	process.exit(1)
})
