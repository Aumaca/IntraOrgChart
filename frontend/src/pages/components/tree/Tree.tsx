import {
	type Edge,
	type Node,
	ReactFlow,
	useNodesState,
	useEdgesState,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { DepartmentNode } from "./Nodes"
import { AnimatePresence } from "framer-motion"
import { PersonDetails } from "./PersonDetails"
import { generateOrgChart, type HandleExpandFn } from "./utils"
import type { Person, TreeData } from "../../../interfaces/interfaces"
import { useMemo, useEffect, type Dispatch, type SetStateAction } from "react"

export default function Tree({
	treeData,
	setTreeData,
	focusedPerson,
	setFocusedPerson,
	isLeftPanelHidden,
	nodesIdToExpandUnder,
	setNodesIdToExpandUnder,
}: {
	treeData: TreeData | null
	isLeftPanelHidden: boolean
	focusedPerson: Person | null
	nodesIdToExpandUnder: number[]
	nodesIdToExpandAbove: number[]
	setTreeData: Dispatch<SetStateAction<TreeData | null>>
	setFocusedPerson: Dispatch<SetStateAction<Person | null>>
	setNodesIdToExpandUnder: Dispatch<SetStateAction<number[]>>
	setNodesIdToExpandAbove: Dispatch<SetStateAction<number[]>>
}) {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

	const nodeTypes = useMemo(
		() => ({
			departmentNode: DepartmentNode,
		}),
		[]
	)

	const handleExpand: HandleExpandFn = async (id) => {
		const newNodesIdToExpandUnder = nodesIdToExpandUnder.includes(id)
			? nodesIdToExpandUnder
			: [...nodesIdToExpandUnder, id]
		const idToFetch =
			id == treeData?.department.parentId ? id : treeData?.department.id

		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/data/department/${idToFetch}?ids=${newNodesIdToExpandUnder.join(",")}`
			)
			const newData: TreeData = await response.json()
			setTreeData(newData)
			setNodesIdToExpandUnder(newNodesIdToExpandUnder)
		} catch (error) {
			console.error("Expand error:", error)
		}
	}

	useEffect(() => {
		if (!treeData) return

		const { nodes, edges } = generateOrgChart(
			treeData,
			nodesIdToExpandUnder,
			handleExpand,
			setFocusedPerson
		)

		setNodes(nodes)
		setEdges(edges)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [treeData, nodesIdToExpandUnder, setNodes, setEdges])

	return (
		<div className="w-full h-full flex flex-col relative overflow-hidden">
			<div className="flex-1 min-h-0 w-full">
				<ReactFlow
					fitView
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
				/>
			</div>

			<AnimatePresence>
				{focusedPerson != null && (
					<PersonDetails
						person={focusedPerson}
						isLeftPanelHidden={isLeftPanelHidden}
						onClose={() => setFocusedPerson(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
