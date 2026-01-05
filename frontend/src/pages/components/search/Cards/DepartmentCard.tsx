import { MapPin } from "lucide-react"
import type { Department } from "../../../../interfaces/interfaces"

export default function DepartmentCard({
	department,
	handleClickCard,
}: {
	department: Department
	handleClickCard: (id: string) => void
}) {
	const id = department.id

	return (
		<div
			key={id}
			className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start mb-3 hover:shadow-md transition-shadow cursor-pointer"
			onClick={() => handleClickCard(id)}
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
		</div>
	)
}
