import type { Person } from "../../../home/data"
import { Briefcase, MapPin, MoreVertical } from "lucide-react"

export default function PersonCard({ people }: { people: Person }) {
	const id = people.id

	return (
		<div
			key={id}
			className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start mb-3 hover:shadow-md transition-shadow"
		>
			<div className="space-y-1">
				<h3 className="text-xl font-bold text-slate-800">
					{people.firstName} {people.lastName}
				</h3>

				<div className="flex items-center text-slate-500 text-sm font-medium mt-1">
					<Briefcase
						size={16}
						className="mr-2 text-slate-400"
					/>
					<span>{people.role}</span>
				</div>

				<div className="flex items-center text-slate-500 text-sm font-medium">
					<MapPin
						size={16}
						className="mr-2 text-slate-400"
					/>
					<span>
						{`${people.continent}, ${people.country}, ${people.state}, ${people.city}`}
					</span>
				</div>
			</div>

			<button className="text-slate-400 hover:text-slate-600 p-1">
				<MoreVertical size={20} />
			</button>
		</div>
	)
}
