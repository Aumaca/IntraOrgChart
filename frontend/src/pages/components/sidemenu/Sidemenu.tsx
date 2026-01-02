import { Info, LogIn, LogOut, X } from "lucide-react"
import { useAuth } from "../../../context/AuthContext"

export default function Sidemenu({
	isOpen,
	onClose,
}: {
	isOpen: boolean
	onClose: () => void
}) {
	const { isAuthenticated, logout } = useAuth()

	return (
		<div
			className={`fixed inset-0 z-50 flex ${
				isOpen ? "pointer-events-auto" : "pointer-events-none"
			}`}
		>
			{/* Backdrop */}
			<div
				className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
					isOpen ? "opacity-100" : "opacity-0"
				}`}
				onClick={onClose}
			></div>

			{/* Slide In/Out */}
			<div
				className={`relative bg-white w-64 h-full shadow-xl flex flex-col p-6 z-10 transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-xl font-bold text-slate-800">Menu</h2>
					<button
						onClick={onClose}
						className="text-slate-500 hover:text-red-500"
					>
						<X
							size={24}
							className="cursor-pointer"
						/>
					</button>
				</div>

				<nav className="space-y-4">
					{/* Login */}
					{!isAuthenticated && (
						<a
							href="/login"
							className="block text-slate-600 hover:text-blue-500 font-medium text-lg"
						>
							<div className="flex items-center gap-2">
								<LogIn />
								<p>Login</p>
							</div>
						</a>
					)}
					<a
						href="/info"
						className="block text-slate-600 hover:text-blue-500 font-medium text-lg"
					>
						<div className="flex items-center gap-2">
							<Info />
							<p>Info</p>
						</div>
					</a>
					{/* Logout */}
					{isAuthenticated && (
						<>
							<hr className="border-slate-200 my-4" />
							<a
								href="#"
								className="block text-red-500 hover:text-red-700 font-medium text-lg"
								onClick={() => logout()}
							>
								<div className="flex items-center gap-2">
									<LogOut />
									<p>Logout</p>
								</div>
							</a>
						</>
					)}
				</nav>
			</div>
		</div>
	)
}
