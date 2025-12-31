import type { ReactNode } from "react"

interface ItemProps {
	children: ReactNode
	href: string
}

export default function Item({ children, href }: ItemProps) {
	return (
		<a
			href={href}
			className="block text-slate-600 hover:text-blue-500 font-medium text-lg"
		>
			{children}
		</a>
	)
}
