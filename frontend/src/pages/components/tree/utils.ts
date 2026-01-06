import dagre from "dagre"
import { Position, type Edge, type Node } from "@xyflow/react"
import type { Person, TreeData } from "../../../interfaces/interfaces"
import type { Dispatch, SetStateAction } from "react"

export type HandleExpandFn = (id: number) => Promise<void>

const NODE_WIDTH = 300
const BASE_HEIGHT = 80
const HEIGHT_PER_PERSON = 40

export const getLayoutedElements = (
	nodes: Node[],
	edges: Edge[],
	direction = "TB"
) => {
	const dagreGraph = new dagre.graphlib.Graph()
	dagreGraph.setDefaultEdgeLabel(() => ({}))

	dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 50 })

	nodes.forEach((node) => {
		const personCount = (node.data.persons as Person[])?.length || 0
		const dynamicHeight = BASE_HEIGHT + personCount * HEIGHT_PER_PERSON

		dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: dynamicHeight })
	})

	edges.forEach((edge) => {
		dagreGraph.setEdge(edge.source, edge.target)
	})

	dagre.layout(dagreGraph)

	const layoutedNodes: Node[] = nodes.map((node) => {
		const nodeWithPosition = dagreGraph.node(node.id)

		if (!nodeWithPosition) return node

		return {
			...node,
			targetPosition: Position.Top,
			sourcePosition: Position.Bottom,
			position: {
				x: nodeWithPosition.x - NODE_WIDTH / 2,
				y: nodeWithPosition.y - nodeWithPosition.height / 2,
			},
		}
	})

	return { nodes: layoutedNodes, edges }
}

interface BuildGraphParams {
	nodes: Node[]
	edges: Edge[]
	data: TreeData
	parentId?: string
	idsToShow: number[]
	handleExpand: HandleExpandFn
	setFocusedPerson: Dispatch<SetStateAction<Person | null>>
}

export const buildGraphRecursively = ({
	data,
	nodes,
	edges,
	parentId,
	idsToShow,
	handleExpand,
	setFocusedPerson,
}: BuildGraphParams): void => {
	if (!data || !data.department) return

	const dept = data.department
	const deptNodeId = `dept-${dept.id}`
	const isExpanded = idsToShow.some((id) => id === dept.id)
	const hasChildren = data.department.childrenIds?.length > 0 ? true : false

	nodes.push({
		id: deptNodeId,
		type: "departmentNode",
		data: {
			departmentId: dept.id,
			isParent: hasChildren,
			hasChildren: hasChildren,
			departmentName: dept.name,
			handleExpand: handleExpand,
			persons: dept.persons || [],
			parentDepartmentId: dept.parentId,
			hasParent: Boolean(dept.parentId),
			setFocusedPerson: setFocusedPerson,
			departmentLocation: dept.localization,
		},
		draggable: false,
		position: { x: 0, y: 0 },
	})

	if (parentId) {
		edges.push({
			id: `e-${parentId}-${deptNodeId}`,
			source: parentId,
			target: deptNodeId,
			type: "step",
		})
	}

	if (isExpanded && hasChildren) {
		data.childrenDepartments.forEach((childTree: TreeData) => {
			buildGraphRecursively({
				data: childTree,
				idsToShow,
				nodes,
				edges,
				parentId: deptNodeId,
				handleExpand,
				setFocusedPerson,
			})
		})
	}
}

interface OrgChartResult {
	nodes: Node[]
	edges: Edge[]
}

export const generateOrgChart = (
	treeData: TreeData,
	idsToShow: number[],
	handleExpand: HandleExpandFn,
	setFocusedPerson: Dispatch<SetStateAction<Person | null>>
): OrgChartResult => {
	const rawNodes: Node[] = []
	const rawEdges: Edge[] = []

	buildGraphRecursively({
		data: treeData,
		idsToShow,
		nodes: rawNodes,
		edges: rawEdges,
		handleExpand,
		setFocusedPerson,
	})

	const { nodes, edges } = getLayoutedElements(rawNodes, rawEdges)

	return { nodes, edges }
}
