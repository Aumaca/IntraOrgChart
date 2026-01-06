import type { Person } from "../../../interfaces/interfaces"
import {
	Mail,
	Phone,
	MapPin,
	Globe,
	User,
	Building2,
	AtSign,
	User2,
} from "lucide-react"

export function PersonDetails({ person }: { person: Person }) {
	return (
		<div className="w-full h-fit bg-white/95 backdrop-blur-sm border-t border-slate-200 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 transition-all duration-300">
			{/* Bar handle */}
			<div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

			<div className="flex flex-col md:flex-row gap-6">
				{/* Avatar */}
				<div className="min-w-[350px] flex flex-row md:flex-col items-center md:items-start gap-4 shrink-0">
					<div className="relative">
						<User2 className="w-20 h-20 border-4 border-white" />
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

				{/* Vertical divisor for desktop */}
				<div className="hidden md:block w-px bg-slate-100 mx-2" />

				{/* Details */}
				<div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
					{/* Contact */}
					<div className="space-y-4">
						<h4 className="w-100 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
							Contact Info
						</h4>
						<InfoItem
							icon={<Mail size={18} />}
							label="Email"
							value={person.email}
							isLink
							href={`mailto:${person.email}`}
						/>
						<InfoItem
							icon={<Phone size={18} />}
							label="Phone"
							value={person.telephone || "N/A"}
						/>
						<InfoItem
							icon={<AtSign size={18} />}
							label="Username"
							value={person.username}
						/>
					</div>

					{/* Grupo: Localização */}
					<div className="space-y-4">
						<h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
							Location
						</h4>
						<InfoItem
							icon={<Globe size={18} />}
							label="Country"
							value={person.country}
						/>
						<InfoItem
							icon={<MapPin size={18} />}
							label="State / City"
							value={`${person.city}, ${person.state}`}
						/>
						<InfoItem
							icon={<User size={18} />}
							label="ID"
							value={`#${person.id}`}
							className="font-mono text-xs"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

function InfoItem({
	icon,
	label,
	value,
	isLink = false,
	href,
	className = "",
}: {
	icon: React.ReactNode
	label: string
	value: string
	isLink?: boolean
	href?: string
	className?: string
}) {
	const Content = (
		<div className="flex items-start gap-3 group w-100">
			<div className="mt-0.5 p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
				{icon}
			</div>
			<div>
				<p className="text-xs text-slate-500 font-medium mb-0.5">{label}</p>
				<p
					className={`text-sm font-semibold text-slate-700 break-all ${className} ${
						isLink ? "group-hover:text-blue-600" : ""
					}`}
				>
					{value}
				</p>
			</div>
		</div>
	)

	if (isLink && href) {
		return (
			<a
				href={href}
				className="block cursor-pointer"
			>
				{Content}
			</a>
		)
	}

	return Content
}
