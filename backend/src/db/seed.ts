// For testing only

import { sql } from "drizzle-orm"
import { db } from "./index"
import { departments, persons } from "./schema"

async function seed() {
	console.log("Seeding Steins;Gate characters and departments...")

	await db
		.insert(departments)
		.values([
			{
				id: 1,
				name: "Future Gadget Laboratory",
				localization: "Tokyo",
				manager_id: 1,
			},
		])
		.onConflictDoUpdate({
			target: departments.id,
			set: {
				name: sql`excluded.name`,
				localization: sql`excluded.localization`,
				manageId: sql`excluded.manager_id`,
			},
		})

	await db
		.insert(persons)
		.values([
			{
				firstName: "Rintaro",
				lastName: "Okabe",
				role: "Lab Member 00x",
				email: "okabe@futuregadget.com",
				username: "HououinKyouma",
				telephone: "090-XXX-XXXX",
				image: "okabe_lab_coat.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Kurisu",
				lastName: "Makise",
				role: "Lab Member 00x",
				email: "kurisu@victor-chondria.edu",
				username: "Christina",
				telephone: null,
				image: "kurisu_uniform.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Mayuri",
				lastName: "Shiina",
				role: "Lab Member 00x",
				email: "mayuri@futuregadget.com",
				username: "Mayushii",
				telephone: null,
				image: "mayuri_hat.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Itaru",
				lastName: "Hashida",
				role: "Lab Member 00x",
				email: "daru@futuregadget.com",
				username: "Daru",
				telephone: null,
				image: "daru_cap.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Moeka",
				lastName: "Kiryu",
				role: "Lab Member 00x",
				email: "moeka@shining-finger.com",
				username: "ShiningFinger",
				telephone: null,
				image: "moeka_glasses.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Luka",
				lastName: "Urushibara",
				role: "Lab Member 00x",
				email: "luka@yanabayashi.com",
				username: "Lukako",
				telephone: null,
				image: "luka_shrine.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Faris",
				lastName: "NyanNyan",
				role: "Lab Member 00x",
				email: "faris@mayqueen.com",
				username: "Faris",
				telephone: null,
				image: "faris_maid.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
			{
				firstName: "Suzuha",
				lastName: "Amane",
				role: "Lab Member 00x",
				email: "suzuha@future.com",
				username: "PartTimeWarrior",
				telephone: null,
				image: "suzuha_bike.jpg",
				continent: "Asia",
				country: "Japan",
				state: "Tokyo",
				city: "Akihabara",
				departmentId: 1,
			},
		])
		.onConflictDoUpdate({
			target: persons.id,
			set: {
				firstName: sql`excluded.first_name`,
				lastName: sql`excluded.last_name`,
				role: sql`excluded.role`,
				email: sql`excluded.email`,
				telephone: sql`excluded.telephone`,
				image: sql`excluded.image`,
				continent: sql`excluded.continent`,
				country: sql`excluded.country`,
				state: sql`excluded.state`,
				city: sql`excluded.city`,
				departmentId: sql`excluded.department_id`,
			},
		})

	console.log("Seeding complete")
}

seed().catch((err) => {
	console.error("Seeding failed", err)
	process.exit(1)
})
