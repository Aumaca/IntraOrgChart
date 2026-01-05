import { ChevronsRight } from "lucide-react";
import type { Person } from "../../../interfaces/interfaces";

export function PersonItem(person: Person) {
  return (
		<li
			key={person.id}
			className="p-2 text-sm text-gray-700 flex items-center gap-2 justify-between cursor-pointer hover:bg-slate-100"
		>
			<div className="flex items-center gap-2">
				<div className="w-2 h-2 rounded-full bg-blue-400"></div>
				{person.firstName} {person.lastName}
			</div>
			<ChevronsRight size={12} />
		</li>
	)
}