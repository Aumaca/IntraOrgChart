import { useRef, useState } from "react"
import Sidemenu from "../components/Sidemenu"
import { employees, type Employee } from "./data"
import EmployeeCard from "../components/EmployeeCard"
import { Menu, Search, ChevronUp, ChevronDown } from "lucide-react"

function Home() {
	const [isExpandedFilters, setIsExpandedFilters] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const listRef = useRef<HTMLDivElement>(null)

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const scrolled = e.currentTarget.scrollTop > 10
		if (scrolled !== isScrolled) {
			setIsScrolled(scrolled)
		}
	}

	return (
		<div className="flex md:flex-row h-screen overflow-hidden">
			<div className="flex-1 md:flex-none md:w-[350px] bg-[#F0F4F8] font-sans flex justify-center md:justify-start">
				<Sidemenu
					isOpen={isOpen}
					key={1}
					onClose={() => setIsOpen(false)}
				/>
				<div className="w-full max-w-lg flex flex-col h-full">
					<div
						className={`px-4 shrink-0 bg-[#F0F4F8] z-20 transition-all duration-300 ease-in-out ${
							isScrolled ? "pt-2 pb-1" : "pt-4 pb-2"
						}`}
					>
						<header
							className={`flex justify-between items-center rounded-lg transition-all duration-300 ${
								isScrolled ? "mb-1" : "mb-2"
							}`}
						>
							<button
								className="text-slate-700 transition-transform duration-300"
								onClick={() => setIsOpen(true)}
							>
								<div
									className={`transition-transform duration-300 ${
										isScrolled ? "scale-75 origin-left" : "scale-100"
									}`}
								>
									<Menu size={32} />
								</div>
							</button>

							<div className="flex-1 flex justify-center">
								<img
									src="/logo.svg"
									className={`transition-all duration-300 ease-in-out ${
										isScrolled ? "w-8 h-8" : "w-[50px] h-[50px]"
									}`}
									alt="Logo"
									onClick={() =>
										listRef.current?.scrollTo({ top: 0, behavior: "smooth" })
									}
								/>
							</div>
							<div className="w-8"></div>
						</header>
					</div>

					<div
						className="flex-1 overflow-y-auto min-h-0 px-4 pb-4 space-y-1 scroll-smooth"
						onScroll={handleScroll}
						ref={listRef}
					>
						<div className="flex items-center mb-4 gap-2 pt-2">
							{/* Search */}
							<div className="relative flex-1">
								<input
									type="text"
									placeholder="Name, department"
									className="w-full bg-[#E6ECF2] text-slate-600 pl-4 pr-10 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200"
								/>
								<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-slate-500">
									<Search size={20} />
								</div>
							</div>

							{/* Filter */}
							<div onClick={() => setIsExpandedFilters(!isExpandedFilters)}>
								{isExpandedFilters ? (
									<ChevronUp
										size={20}
										className="text-slate-600"
									/>
								) : (
									<ChevronDown
										size={20}
										className="text-slate-600"
									/>
								)}
							</div>
						</div>

						{isExpandedFilters && (
							<div className="mb-6">
								<div className="bg-[#E6ECF2] p-3 rounded-lg text-xs text-slate-600 shadow-sm">
									<h4 className="font-bold mb-2 text-slate-700">Localidade</h4>
									<ul className="space-y-1">
										<li className="flex items-center">
											<span className="w-2 h-2 bg-slate-400 mr-2"></span> South
											America (SA)
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 bg-slate-300 mr-2"></span> North
											America (NA)
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 bg-slate-300 mr-2"></span> Asia
											(AS)
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 bg-slate-300 mr-2"></span> Europe
											(EU)
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 bg-slate-300 mr-2"></span> Africa
											(AF)
										</li>
									</ul>
								</div>
							</div>
						)}

						{/* Results list */}
						{employees.map((emp: Employee, index) => (
							<EmployeeCard
								key={`${emp.id}-${index}`}
								employee={emp}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="min-h-screen bg-white font-sans hidden md:flex w-64 items-center justify-center border-l">
				<h1>teste</h1>
			</div>
		</div>
	)
}

export default Home
