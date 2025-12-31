import {
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useState, useCallback, useMemo } from "react"
import { DepartmentNode, initialEdges, initialNodes, PersonNode } from "./Nodes"

export default function Tree() {
	const [nodes, setNodes] = useState(initialNodes)
	const [edges, setEdges] = useState(initialEdges)

	const nodeTypes = useMemo(
		() => ({
			personNode: PersonNode,
			departmentNode: DepartmentNode,
		}),
		[]
	)

	const onNodesChange = useCallback(
		(changes) =>
			setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
		[]
	)
	const onEdgesChange = useCallback(
		(changes) =>
			setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
		[]
	)
	const onConnect = useCallback(
		(params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
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
