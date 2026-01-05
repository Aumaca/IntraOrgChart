import { Menu } from "lucide-react"
import { useRef, useState } from "react"
import Tree from "../components/tree/Tree"
import { getDepartmentData } from "./utils"
import Sidemenu from "../components/sidemenu/Sidemenu"
import { LogoThatTakesToTop } from "../components/Logo"
import SearchComponent from "../components/search/Search"
import ResultsList from "../components/search/ResultsList"
import type { TreeData } from "../../interfaces/interfaces"

export default function Home() {
	const [isOpen, setIsOpen] = useState(false)
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
		<div className="flex md:flex-row h-screen overflow-hidden">
			<div className="flex-1 md:flex-none md:w-[350px] bg-[#F0F4F8] font-sans flex justify-center md:justify-start">
				{/* Sidemenu */}
				<Sidemenu
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
				/>

				<div className="w-full max-w-lg flex flex-col h-full">
					{/* Header */}
					<div
						className={`px-4 shrink-0 bg-[#F0F4F8] z-20 transition-all ${
							isScrolled ? "pt-2 pb-1" : "pt-4 pb-2"
						}`}
					>
						<header className="flex justify-between items-center">
							<button
								onClick={() => setIsOpen(true)}
								className="cursor-pointer"
							>
								<Menu
									size={32}
									className={`${
										isScrolled ? "scale-75" : "scale-100"
									} transition-transform`}
								/>
							</button>
							<LogoThatTakesToTop
								isScrolled={isScrolled}
								listRef={listRef}
							/>
							<div className="w-8"></div>
						</header>
					</div>

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

			<div className="hidden md:flex flex-1 bg-white border-l">
				<Tree
					treeData={treeData}
					setTreeData={setTreeData}
					nodesIdToExpandUnder={nodesIdToExpandUnder}
					setNodesIdToExpandUnder={setNodesIdToExpandUnder}
					nodesIdToExpandAbove={nodesIdToExpandAbove}
					setNodesIdToExpandAbove={setNodesIdToExpandAbove}
				/>
			</div>
		</div>
	)
}
