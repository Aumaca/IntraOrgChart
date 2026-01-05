import Input from "./Input"
import Filters from "./Filters"
import { useState, useEffect } from "react"

interface SearchProps {
	onSearch: (data: { persons: unknown[]; departments: unknown[] }) => void
}

export default function SearchComponent({ onSearch }: SearchProps) {
	const [isExpandedFilters, setIsExpandedFilters] = useState(false)
	const [query, setQuery] = useState("")

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (query.trim().length > 0) {
				try {
					const res = await fetch(
						`${
							import.meta.env.VITE_BACKEND_URL
						}/data/search?search=${encodeURIComponent(query)}`
					)
					const data = await res.json()
					onSearch(data.results)
				} catch (err) {
					console.error("Error searching:", err)
				}
			} else {
				onSearch({ persons: [], departments: [] })
			}
		}, 300)

		return () => clearTimeout(timer)
	}, [query])

	return (
		<div className="space-y-4">
			<Input
				query={query}
				setQuery={setQuery}
				isExpandedFilters={isExpandedFilters}
				setIsExpandedFilters={setIsExpandedFilters}
			/>

			{isExpandedFilters && <Filters />}
		</div>
	)
}
