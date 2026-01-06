import {
	Copy,
	Mail,
	Check,
	Phone,
	Globe,
	User2,
	MapPin,
	AtSign,
	Building2,
} from "lucide-react"
import { useState } from "react"
import type { Person } from "../../../interfaces/interfaces"
import { motion, useDragControls, type PanInfo } from "framer-motion"

export function PersonDetails({
	person,
	onClose,
	isLeftPanelHidden,
}: {
	person: Person
	onClose: () => void
	isLeftPanelHidden: boolean
}) {
	const controls = useDragControls()

	const handleDragEnd = (_: unknown, info: PanInfo) => {
		if (info.offset.y > 30 || info.velocity.y > 20) {
			onClose()
		}
	}

	return (
		<motion.div
			// Animation
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			exit={{ y: "100%" }}
			transition={{ type: "spring", damping: 25, stiffness: 300 }}
			// Drag
			drag="y"
			dragControls={controls}
			dragListener={false}
			dragConstraints={{ top: 0 }}
			dragElastic={0.1}
			dragMomentum={false} // Stop slow drift issue
			dragSnapToOrigin={true} // Goes back to top if not closed
			onDragEnd={handleDragEnd}
			className="w-full h-fit bg-white/95 backdrop-blur-sm border-t border-slate-200 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 z-50 absolute bottom-0 left-0"
		>
			<div
				onPointerDown={(e) => controls.start(e)}
				className="w-full flex justify-center cursor-grab active:cursor-grabbing touch-none py-2 mb-4 -mt-2"
			>
				{/* Bar Handle */}
				<div className="w-12 h-1.5 bg-slate-300 rounded-full" />
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Begin Avatar */}
				<div className="flex flex-row md:flex-col items-center md:items-start gap-4 shrink-0">
					<div className="relative">
						{person.image ? (
							<img
								src={person.image}
								alt="Avatar"
								className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-white"
							/>
						) : (
							<div className="w-20 h-20 bg-slate-100 rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
								<User2
									className="text-slate-400"
									size={32}
								/>
							</div>
						)}
					</div>

					<div className="text-left md:text-center md:text-left">
						<h1 className="text-2xl font-bold text-slate-800 leading-tight">
							{person.firstName} {person.lastName}
						</h1>
						<div className="flex items-center gap-1.5 text-blue-600 font-medium mt-1">
							<Building2 size={16} />
							<span>{person.role}</span>
						</div>
					</div>
				</div>
				{/* End Avatar */}

				{/* Vertical divisor (desktop) */}
				<div className="hidden md:block w-px bg-slate-100 mx-2" />

				{/* Person Details */}
				<div
					className={`flex-1 grid grid-cols-1 ${
						isLeftPanelHidden ? "sm:grid-cols-2" : ""
					} gap-y-5`}
				>
					{/* Contact Info Section */}
					<div className="space-y-4">
						<h4 className="w-100 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
							Contact Info
						</h4>
						{/* Email */}
						<InfoItem
							icon={<Mail size={18} />}
							label="Email"
							value={person.email}
							isLink
							href={`mailto:${person.email}`}
							isCopyable={true}
						/>
						{/* Phone */}
						<InfoItem
							icon={<Phone size={18} />}
							label="Phone"
							value={person.telephone || "N/A"}
						/>
						{/* Username */}
						<InfoItem
							icon={<AtSign size={18} />}
							label="Username"
							value={person.username}
						/>
					</div>

					{/* Location Section */}
					<div className="space-y-4">
						<h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
							Location
						</h4>

						{/* Country */}
						<InfoItem
							icon={<Globe size={18} />}
							label="Country"
							value={person.country}
						/>
						{/* State / City */}
						<InfoItem
							icon={<MapPin size={18} />}
							label="State / City"
							value={`${person.city}, ${person.state}`}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

function InfoItem({
	icon,
	label,
	value,
	href,
	className = "",
	isLink = false,
	isCopyable = false,
}: {
	icon: React.ReactNode
	label: string
	value: string
	href?: string
	isLink?: boolean
	className?: string
	isCopyable?: boolean
}) {
	const [copied, setCopied] = useState(false)

	const handleCopy = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		navigator.clipboard.writeText(value)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const InnerContent = (
		<div className="flex items-start gap-3 group w-full relative">
			<div className="mt-0.5 p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
				{icon}
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
				<div className="flex items-center gap-2">
					<p
						className={`text-sm font-semibold text-slate-700 break-all ${className} ${
							isLink ? "group-hover:text-blue-600" : ""
						}`}
					>
						{value}
					</p>

					{isCopyable && (
						<button
							onClick={handleCopy}
							className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
							title="Copy to clipboard"
						>
							{copied ? (
								<Check
									size={14}
									className="text-green-500"
								/>
							) : (
								<Copy size={14} />
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	)

	if (isLink && href) {
		return (
			<a
				href={href}
				className="block cursor-pointer"
			>
				{InnerContent}
			</a>
		)
	}

	return InnerContent
}
