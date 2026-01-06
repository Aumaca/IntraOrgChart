import { useRef, useState } from "react"
import Tree from "../components/tree/Tree"
import { getDepartmentData } from "./utils"
import { ChevronsRight, Menu } from "lucide-react"
import Sidemenu from "../components/sidemenu/Sidemenu"
import { LogoThatTakesToTop } from "../components/Logo"
import SearchComponent from "../components/search/Search"
import ResultsList from "../components/search/ResultsList"
import type { Person, TreeData } from "../../interfaces/interfaces"

export interface searchResultsProps {
	persons: []
	departments: []
}

export default function Home() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isSearching, setIsSearching] = useState(false)
	const [isSidemenuOpen, setIsSidemenuOpen] = useState(false)
	const [treeData, setTreeData] = useState<TreeData | null>(null)
	const [focusedPerson, setFocusedPerson] = useState<Person | null>(null)
	const [isLeftPanelHidden, setIsLeftPanelHidden] = useState<boolean>(false)
	const [nodesIdToExpandUnder, setNodesIdToExpandUnder] = useState<number[]>([])
	const [nodesIdToExpandAbove, setNodesIdToExpandAbove] = useState<number[]>([])
	const [searchResults, setSearchResults] = useState<searchResultsProps>({
		persons: [],
		departments: [],
	})

	const listRef = useRef<HTMLDivElement>(null)

	const handleSearchUpdate = (results: searchResultsProps) => {
		setSearchResults(results)
		setIsSearching(results.persons.length > 0 || results.departments.length > 0)
	}

	const handleClickCard = async (id: string): Promise<void> => {
		const data: TreeData = await getDepartmentData(id)

		if (window.innerWidth < 768) {
			setIsLeftPanelHidden(true)
		}

		setNodesIdToExpandUnder([])
		setTreeData(data)
	}

	return (
		<div className="flex h-screen overflow-hidden relative">
			{/* Toggle button (desktop) */}
			<button
				onClick={() => setIsLeftPanelHidden(!isLeftPanelHidden)}
				className={`hidden md:flex absolute z-50 top-6 h-10 w-10 cursor-pointer items-center justify-center rounded-e-lg border border-gray-200 bg-white text-slate-500 shadow-md transition-all duration-500 ease-in-out hover:bg-gray-50 hover:text-slate-800 ${
					isLeftPanelHidden ? "left-0" : "left-[350px]"
				}`}
			>
				<ChevronsRight
					size={24}
					className={`transition-transform duration-500 ${
						isLeftPanelHidden ? "" : "rotate-180"
					}`}
				/>
			</button>

			{/* Left Panel */}
			<div
				className={`
          relative bg-[#F0F4F8] shadow-2xl font-sans flex flex-col justify-start overflow-hidden transition-all duration-500 ease-in-out
          flex-none h-full
          ${isLeftPanelHidden ? "w-0" : "w-full md:w-[350px]"}
        `}
			>
				{/* Sidemenu */}
				<Sidemenu
					isSidemenuOpen={isSidemenuOpen}
					onToggle={() => setIsSidemenuOpen(!isSidemenuOpen)}
				/>

				<div className="w-full flex flex-col h-full min-w-[100vw] md:min-w-[350px]">
					{/* Header */}
					<div
						className={`px-4 shrink-0 bg-[#F0F4F8] z-20 transition-all ${
							isScrolled ? "pt-2 pb-1" : "pt-4 pb-2"
						}`}
					>
						<header className="flex justify-between items-center">
							<button
								className="cursor-pointer"
								onClick={() => setIsSidemenuOpen(true)}
							>
								<Menu
									size={32}
									className={`${
										isScrolled ? "scale-75" : "scale-100"
									} transition-transform`}
								/>
							</button>
							<LogoThatTakesToTop
								listRef={listRef}
								isScrolled={isScrolled}
							/>
							<div className="w-8"></div>
						</header>
					</div>

					{/* Search Content */}
					<div
						className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scroll-smooth"
						onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 10)}
						ref={listRef}
					>
						<SearchComponent onSearch={handleSearchUpdate} />

						<ResultsList
							isSearching={isSearching}
							searchResults={searchResults}
							handleClickCard={handleClickCard}
						/>
					</div>
				</div>
			</div>

			{/* Right Panel */}
			<div
				className={`flex-1 bg-white flex flex-col h-full min-w-0 relative transition-all duration-500`}
			>
				{/* Show left panel button (mobile) */}
				{isLeftPanelHidden && (
					<button
						onClick={() => setIsLeftPanelHidden(false)}
						className="md:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg border border-gray-200"
					>
						<ChevronsRight
							className="rotate-180"
							size={20}
						/>
					</button>
				)}

				<Tree
					treeData={treeData}
					setTreeData={setTreeData}
					focusedPerson={focusedPerson}
					setFocusedPerson={setFocusedPerson}
					isLeftPanelHidden={isLeftPanelHidden}
					nodesIdToExpandUnder={nodesIdToExpandUnder}
					nodesIdToExpandAbove={nodesIdToExpandAbove}
					setNodesIdToExpandUnder={setNodesIdToExpandUnder}
					setNodesIdToExpandAbove={setNodesIdToExpandAbove}
				/>
			</div>
		</div>
	)
}
