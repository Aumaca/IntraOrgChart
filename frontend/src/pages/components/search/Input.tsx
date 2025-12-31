import { ChevronDown, ChevronUp, SearchIcon } from "lucide-react"

export default function Input({
	query,
	setQuery,
	isExpandedFilters,
	setIsExpandedFilters,
}: {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
	isExpandedFilters: boolean
	setIsExpandedFilters: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<div className="flex items-center gap-2 pt-2">
			<div className="relative flex-1">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Name, department, city..."
					className="w-full bg-[#E6ECF2] text-slate-600 pl-4 pr-10 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200"
				/>
				<div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
					<SearchIcon size={20} />
				</div>
			</div>

			<div
				onClick={() => setIsExpandedFilters(!isExpandedFilters)}
				className="cursor-pointer"
			>
				{isExpandedFilters ? (
					<ChevronUp size={20} />
				) : (
					<ChevronDown size={20} />
				)}
			</div>
		</div>
	)
}
