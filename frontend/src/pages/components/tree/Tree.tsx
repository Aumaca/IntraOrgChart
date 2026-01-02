import {
	addEdge,
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	type Connection,
	type Edge,
	type Node,
	type NodeChange,
	type EdgeChange,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { DepartmentNode, PersonNode } from "./Nodes"
import type { TreeData } from "../../../interfaces/interfaces"
import { useState, useCallback, useMemo, useEffect } from "react"

export default function Tree({ treeData }: { treeData: TreeData | null }) {
	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])

	const nodeTypes = useMemo(
		() => ({
			personNode: PersonNode,
			departmentNode: DepartmentNode,
		}),
		[]
	)

	useEffect(() => {
		if (!treeData || !treeData.department) return

		const department = treeData.department
		const persons = treeData.persons || []

		const deptNode: Node = {
			id: "dept-1",
			type: "departmentNode",
			position: { x: 0, y: 0 },
			data: {
				departmentName: department.name,
				departmentLocation: department.localization,
			},
		}

		const peopleNodes: Node[] = persons.map((person, index) => ({
			id: `person-${index}`,
			type: "personNode",
			position: {
				x: 150,
				y: 75 + index * 55,
			},
			data: { personName: person.firstName + " " + person.lastName },
		}))

		const generatedEdges: Edge[] = persons.map((_, index) => ({
			id: `e-dept-person-${index}`,
			source: "dept-1",
			target: `person-${index}`,
			type: "smoothstep",
		}))

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setNodes([deptNode, ...peopleNodes])
		setEdges(generatedEdges)
	}, [treeData])

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	)
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) =>
			setEdges((eds) => applyEdgeChanges(changes, eds)),
		[]
	)
	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[]
	)

	return (
		<div className="w-full h-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
			/>
		</div>
	)
}
