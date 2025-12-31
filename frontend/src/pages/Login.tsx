import Logo from "./components/Logo"
import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { User, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"

export default function Login() {
	const { login } = useAuth()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				}
			)

			const data = await response.json()
			console.log(data)

			if (response.ok) {
				login(data.token)
				window.location.href = "/"
			} else {
				alert("Login failed")
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 font-sans">
			<div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-slate-100 p-8">
				{/* Header */}
				<div className="flex flex-col items-center mb-8">
					<div className="mb-4 text-slate-800">
						<Logo />
					</div>
					<h1 className="text-2xl font-bold text-slate-800">Welcome</h1>
					<p className="text-slate-500 text-sm mt-1">
						Login to access the org chart settings
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="space-y-5"
				>
					{/* Input Email */}
					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-slate-700 ml-1">
							Email
						</label>
						<div className="relative group">
							<div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
								<User size={20} />
							</div>
							<input
								type="email"
								placeholder="email@org.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full bg-[#F0F4F8] text-slate-800 pl-10 pr-4 py-3 rounded-xl border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all placeholder:text-slate-400"
								required
							/>
						</div>
					</div>

					{/* Input Password */}
					<div className="space-y-1.5">
						<div className="flex justify-between items-center ml-1">
							<label className="text-sm font-semibold text-slate-700">
								Password
							</label>
							<a
								href="#"
								className="text-xs text-blue-500 hover:text-blue-600 font-medium"
							>
								Forgot?
							</a>
						</div>
						<div className="relative group">
							<div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
								<Lock size={20} />
							</div>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full bg-[#F0F4F8] text-slate-800 pl-10 pr-12 py-3 rounded-xl border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all placeholder:text-slate-400"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
					>
						<span>Login</span>
						<ArrowRight size={18} />
					</button>
				</form>
			</div>
		</div>
	)
}
