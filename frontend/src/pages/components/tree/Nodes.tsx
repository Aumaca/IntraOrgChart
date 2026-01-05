import { PersonItem } from "./PersonItem"
import type { HandleExpandFn } from "./utils"
import { ChevronsDown, ChevronsUp } from "lucide-react"
import type { Person } from "../../../interfaces/interfaces"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"

type DepartmentNodeData = {
	persons: Person[]
	hasParent: boolean
	idsToShow: number[]
	hasChildren: boolean
	departmentId: number
	departmentName: string
	departmentLocation: string
	parentDepartmentId: number
	handleExpand: HandleExpandFn
}

type DepartmentNodeProps = NodeProps<Node<DepartmentNodeData>>

export const DepartmentNode = ({ data }: DepartmentNodeProps) => {
	return (
		<div className="flex flex-col items-center">
			{/* Icon to expand above */}
			{data.hasParent ? (
				<>
					<Handle
						type="target"
						position={Position.Top}
						className="!bg-gray-500"
					/>
					<div
						onClick={() => data.handleExpand(data.parentDepartmentId)}
						className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-0.5 cursor-pointer border text-gray-300 border-gray-300 hover:text-gray-500 hover:border-gray-500"
					>
						<ChevronsUp size={16} />
					</div>
				</>
			) : (
				<></>
			)}

			{/* Department header */}
			<div className="w-[300px] bg-blue-600 text-white p-4 rounded-t-lg shadow-lg cursor-pointer hover:bg-blue-700 transition">
				<div className="font-bold text-lg text-center">
					{data.departmentName}
				</div>
				<div className="text-xs text-blue-100 text-center">
					{data.departmentLocation}
				</div>
			</div>

			{/* People */}
			<div className="w-full mb-2 bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
				{data.persons && data.persons.length > 0 ? (
					<ul className="divide-y divide-gray-100">
						{data.persons.map((person) => (
							PersonItem(person)
						))}
					</ul>
				) : (
					<div className="p-2 text-xs text-gray-400 italic text-center">
						No members
					</div>
				)}
			</div>

			{/* Icon to expand under */}
			{data.hasChildren ? (
				<>
					<div
						onClick={() => data.handleExpand(data.departmentId)}
						className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white rounded-full p-0.5 cursor-pointer border text-gray-300 border-gray-300 hover:text-gray-500 hover:border-gray-500 z-1"
					>
						<ChevronsDown size={16} />
					</div>
					<Handle
						type="source"
						position={Position.Bottom}
						className="!bg-gray-500"
					/>
				</>
			) : (
				<></>
			)}
		</div>
	)
}
