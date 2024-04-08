import logo from "../assets/logo.webp";

const Title = () => {
	return (
		<>
			<div className="absolute h-full left-4 top-4 text-white">
				{/* Stick with the wheel */}
				<div className="sticky top-4 h-dvh">
					<div className="flex items-center gap-3 opacity-50 hover:opacity-100 duration-500">
						<img src={logo} alt="DCWheel logo" className="h-10 w-auto" />
						<span>
							<h1>DCWheel v0.23.0 (Beta)</h1>
							<p className="text-xs">
								Made with 💚 by{" "}
								<a
									href="https://github.com/Wilzzu"
									target="_blank"
									rel="noreferrer"
									className="text-sm font-bold underline decoration-1 hover:decoration-2 text-green-500 hover:text-green-400 hover:tracking-wider duration-500">
									Wilzzu
								</a>
							</p>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Title;
