import {
	ReactFlow,
	useNodesState,
	useEdgesState,
	type Edge,
	type Node,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { DepartmentNode } from "./Nodes"
import type { Person, TreeData } from "../../../interfaces/interfaces"
import { generateOrgChart, type HandleExpandFn } from "./utils"
import { useMemo, useEffect, type Dispatch, type SetStateAction } from "react"
import { PersonDetails } from "./PersonDetails"

export default function Tree({
	treeData,
	setTreeData,
	focusedPerson,
	setFocusedPerson,
	nodesIdToExpandUnder,
	setNodesIdToExpandUnder,
}: {
	treeData: TreeData | null
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
		<div className="w-full h-full flex flex-col">
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

			{/* Bottom panel */}
			{focusedPerson != null && <PersonDetails person={focusedPerson} />}
		</div>
	)
}
