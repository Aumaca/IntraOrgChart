import { Briefcase, MapPin } from "lucide-react"
import type { Person } from "../../../../interfaces/interfaces"

export default function PersonCard({
	person,
	handleClickCard,
}: {
	person: Person
	handleClickCard: (deptId: string, person: Person | null) => void
}) {
	const id = person.id

	return (
		<div
			key={id}
			className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start mb-3 hover:shadow-md transition-shadow cursor-pointer"
			onClick={() => handleClickCard(person.departmentId, person)}
		>
			<div className="space-y-1">
				<h3 className="text-xl font-bold text-slate-800">
					{person.firstName} {person.lastName}
				</h3>

				<div className="flex items-center text-slate-500 text-sm font-medium mt-1">
					<Briefcase
						size={16}
						className="mr-2 text-slate-400"
					/>
					<span>{person.role}</span>
				</div>

				<div className="flex items-center text-slate-500 text-sm font-medium">
					<MapPin
						size={16}
						className="mr-2 text-slate-400"
					/>
					<span>
						{`${person.continent}, ${person.country}, ${person.state}, ${person.city}`}
					</span>
				</div>
			</div>
		</div>
	)
}
