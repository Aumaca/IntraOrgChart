import { useRef, useState } from "react"
import Tree from "../components/tree/Tree"
import { getDepartmentData } from "./utils"
import { ChevronsRight, Menu } from "lucide-react"
import Sidemenu from "../components/sidemenu/Sidemenu"
import { LogoThatTakesToTop } from "../components/Logo"
import SearchComponent from "../components/search/Search"
import ResultsList from "../components/search/ResultsList"
import type { TreeData } from "../../interfaces/interfaces"

export default function Home() {
	const [isSidemenuOpen, setIsSidemenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [searchResults, setSearchResults] = useState<{
		persons: unknown[]
		departments: unknown[]
	}>({
		persons: [],
		departments: [],
	})
	const [isSearching, setIsSearching] = useState(false)
	const [treeData, setTreeData] = useState<TreeData | null>(null)
	const [nodesIdToExpandUnder, setNodesIdToExpandUnder] = useState<number[]>([])
	const [nodesIdToExpandAbove, setNodesIdToExpandAbove] = useState<number[]>([])
	const [isLeftPanelHidden, setIsLeftPanelHidden] = useState<boolean>(false)

	const listRef = useRef<HTMLDivElement>(null)

	const handleSearchUpdate = (results: {
		persons: unknown[]
		departments: unknown[]
	}) => {
		setSearchResults(results)
		setIsSearching(results.persons.length > 0 || results.departments.length > 0)
	}

	const handleClickCard = async (id: string): Promise<void> => {
		const data: TreeData = await getDepartmentData(id)

		setNodesIdToExpandUnder([])
		setTreeData(data)
	}

	return (
		<div className="flex md:flex-row h-screen overflow-hidden relative">
			{/* Toggle button to hide left panel */}
			<button
				onClick={() => setIsLeftPanelHidden(!isLeftPanelHidden)}
				className={`hidden md:flex absolute z-50 top-6 h-10 w-10 cursor-pointer items-center justify-center rounded-e-lg border border-gray-200 bg-white text-slate-500 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-50 hover:text-slate-800 ${
					isLeftPanelHidden ? "left-0" : "left-[350px]"
				}`}
			>
				<ChevronsRight
					size={24}
					className={`transition-transform duration-300 ${
						isLeftPanelHidden ? "" : "rotate-180"
					}`}
				/>
			</button>

			{/* Left Panel */}
			<div
				className={`relative flex-1 md:flex-none bg-[#F0F4F8] shadow-2xl font-sans flex justify-center md:justify-start overflow-hidden transition-all duration-300 ease-in-out ${
					isLeftPanelHidden ? "md:w-0 opacity-0" : "md:w-[350px] opacity-100"
				}`}
			>
				{/* Sidemenu */}
				<Sidemenu
					isSidemenuOpen={isSidemenuOpen}
					onToggle={() => setIsSidemenuOpen(!isSidemenuOpen)}
				/>

				{/* Left Panel Content */}
				<div className="w-full max-w-lg flex flex-col h-full min-w-[350px]">
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

					{/* Search */}
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

			{/* Right panel */}
			<div className="hidden md:flex flex-1 bg-white">
				<Tree
					treeData={treeData}
					setTreeData={setTreeData}
					nodesIdToExpandUnder={nodesIdToExpandUnder}
					nodesIdToExpandAbove={nodesIdToExpandAbove}
					setNodesIdToExpandUnder={setNodesIdToExpandUnder}
					setNodesIdToExpandAbove={setNodesIdToExpandAbove}
				/>
			</div>
		</div>
	)
}
