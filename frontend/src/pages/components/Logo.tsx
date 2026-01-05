export function Logo() {
	return (
		<a href="/">
			<img
				src="logo.svg"
				alt="Logo"
				width={100}
				height={100}
			/>
		</a>
	)
}

export function LogoThatTakesToTop({
	isScrolled,
	listRef,
}: {
	isScrolled: boolean
	listRef: React.RefObject<HTMLDivElement | null>
}) {
	return (
		<div className="flex-1 flex justify-center">
			<img
				src="/logo.svg"
				className={`cursor-pointer transition-all duration-300 ease-in-out ${
					isScrolled ? "w-8 h-8" : "w-[50px] h-[50px]"
				}`}
				alt="Logo"
				onClick={() =>
					listRef.current?.scrollTo({ top: 0, behavior: "smooth" })
				}
			/>
		</div>
	)
}
