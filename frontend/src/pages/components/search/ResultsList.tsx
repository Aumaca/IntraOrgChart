import PersonCard from "./Cards/PersonCard"
import DepartmentCard from "./Cards/DepartmentCard"
import type { Department, Person } from "../../home/data"

export default function ResultsList({
	isSearching,
	searchResults,
}: {
	isSearching: boolean
	searchResults: {
		persons: unknown[]
		departments: unknown[]
	}
}) {
	return (
		<div className="space-y-2">
			{isSearching ? (
				<>
					{/* Departments section */}
					{searchResults.departments.length > 0 && (
						<div className="pt-2">
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
								Departments
							</p>
							{(searchResults.departments as Department[]).map((dept) => (
								<DepartmentCard department={dept} />
							))}
						</div>
					)}

					{/* People section */}
					{searchResults.persons.length > 0 && (
						<div className="pt-2">
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
								People
							</p>
							{(searchResults.persons as Person[]).map((emp) => (
								<PersonCard people={emp} />
							))}
						</div>
					)}
				</>
			) : (
				// If there's nothing in search input
				<div className="flex flex-col items-center justify-center content-center text-slate-500">
					<p>Start searching to see results</p>
				</div>
			)}
		</div>
	)
}
