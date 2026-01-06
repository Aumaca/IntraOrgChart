import PersonCard from "./Cards/PersonCard"
import DepartmentCard from "./Cards/DepartmentCard"
import type { Department, Person } from "../../../interfaces/interfaces"

export default function ResultsList({
	isSearching,
	searchResults,
	handleClickCard,
}: {
	isSearching: boolean
	searchResults: {
		persons: unknown[]
		departments: unknown[]
	}
	handleClickCard: (id: string) => void
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
								<DepartmentCard
									department={dept}
									key={`dept-${dept.id}`}
									handleClickCard={handleClickCard}
								/>
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
								<PersonCard
									persons={emp}
									key={`p-${emp.id}`}
									handleClickCard={handleClickCard}
								/>
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
