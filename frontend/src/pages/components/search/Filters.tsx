import { useState } from "react"

const locations = ["South America", "North America", "Asia", "Europe", "Africa"]

export default function Filters() {
	const [selected, setSelected] = useState<string[]>([])

	const toggleLocation = (loc: string) => {
		setSelected((prev) =>
			prev.includes(loc) ? prev.filter((item) => item !== loc) : [...prev, loc]
		)
	}

	return (
		<div className="bg-[#E6ECF2] p-3 rounded-lg text-xs text-slate-600 shadow-sm animate-in fade-in slide-in-from-top-1">
			<h4 className="font-bold mb-2 text-slate-700">Localidade</h4>
			<ul className="grid grid-cols-2 gap-y-2 gap-x-1">
				{locations.map((loc) => {
					const isChecked = selected.includes(loc)

					return (
						<li
							key={loc}
							className="flex items-center"
						>
							<label className="flex items-center cursor-pointer group select-none">
								<input
									type="checkbox"
									className="peer hidden"
									checked={isChecked}
									onChange={() => toggleLocation(loc)}
								/>
								<div
									className={`
                    w-3 h-3 mr-2 rounded-[2px] border flex items-center justify-center transition-all duration-200
                    border-slate-400 bg-transparent group-hover:border-slate-500
                    peer-checked:bg-slate-600 peer-checked:border-slate-600
                  `}
								>
									<svg
										className="w-2 h-2 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<span
									className={`${
										isChecked ? "text-slate-900 font-medium" : "text-slate-600"
									}`}
								>
									{loc}
								</span>
							</label>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
