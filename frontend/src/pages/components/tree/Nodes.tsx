import { ChevronRight, ChevronsUp, MapPin } from "lucide-react"
import { Handle, Position } from "@xyflow/react"

export const DepartmentNode = ({
	data,
}: {
	data: { departmentName: string; departmentLocation: string }
}) => {
	return (
		<div className="relative flex flex-col items-center gap-1 p-[10px] border border-[#777] rounded-[5px] bg-white">
			<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-0.5 cursor-pointer border text-gray-300 border-gray-300 hover:text-gray-500 hover:border-gray-500">
				<ChevronsUp size={12} />
			</div>

			<h1 className="font-bold">{data.departmentName}</h1>

			<div className="flex gap-1 items-center">
				<MapPin
					size={12}
					className="text-slate-400"
				/>
				<p className="text-xs">{data.departmentLocation}</p>
			</div>

			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</div>
	)
}

export const PersonNode = ({ data }: { data: { personName: string } }) => {
	return (
		<div className="flex items-center justify-between gap-3 p-[10px] border border-gray-400 rounded-[5px] bg-white min-w-[200px]">
			<Handle
				type="target"
				position={Position.Left}
			/>
			<p>{data.personName}</p>
			<ChevronRight size={16} />
		</div>
	)
}
