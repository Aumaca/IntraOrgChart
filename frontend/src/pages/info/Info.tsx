import { Logo } from "../components/Logo"
import { Globe } from "lucide-react"
import { Lineicons } from "@lineiconshq/react-lineicons"
import { LinkedinOutlined, GithubOutlined } from "@lineiconshq/free-icons"

export default function Info() {
	return (
		<div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 font-sans">
			<div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-slate-100 p-8">
				<div className="flex flex-col gap-3 items-center">
					{/* Header */}
					<div className="mb-4 text-slate-800">
						<Logo />
					</div>

					<h1 className="text-2xl font-bold text-slate-800">IntraOrgChart</h1>
					<p className="text-slate-500 text-md mt-1 text-center">
						This is an <span className="font-bold">open-source org chart</span>{" "}
						for companies to self-host
					</p>
					<p className="text-slate-500 text-md mt-1">
						Developed by
						<span className="text-blue-500 font-bold italic">
							Carlos Aumaca
						</span>
					</p>

					{/* Socials */}
					<div className="flex mt-2 gap-3 justify-center">
						{/* Github */}
						<a
							href="https://github.com/Aumaca"
							referrerPolicy="no-referrer"
							target="_blank"
						>
							<Lineicons
								icon={GithubOutlined}
								size={50}
								className="text-gray-500 hover:text-black transition-colors duration-200"
							/>
						</a>
						{/* Linkedin */}
						<a
							href="https://www.linkedin.com/in/carlos-mariano-cardoso/"
							referrerPolicy="no-referrer"
							target="_blank"
						>
							<Lineicons
								icon={LinkedinOutlined}
								size={50}
								className="text-gray-500 hover:text-blue-500 transition-colors duration-200"
							/>
						</a>
						{/* Website */}
						<a
							href="https://myportfolio-4j5.pages.dev/"
							referrerPolicy="no-referrer"
							target="_blank"
						>
							<Globe
								size={50}
								className="text-gray-500 hover:text-purple-500 transition-colors duration-200"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
