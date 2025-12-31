import type { Department } from "../../../home/data"
import { MapPin, MoreVertical } from "lucide-react"

export default function DepartmentCard({
	department,
}: {
	department: Department
}) {
	const id = department.id

	return (
		<div
			key={id}
			className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start mb-3 hover:shadow-md transition-shadow"
		>
			<div className="space-y-1">
				<h3 className="text-xl font-bold text-slate-800">{department.name}</h3>

				<div className="flex items-center text-slate-500 text-sm font-medium">
					<MapPin
						size={16}
						className="mr-2 text-slate-400"
					/>
					<span>{department.localization}</span>
				</div>
			</div>

			<button className="text-slate-400 hover:text-slate-600 p-1">
				<MoreVertical size={20} />
			</button>
		</div>
	)
}
