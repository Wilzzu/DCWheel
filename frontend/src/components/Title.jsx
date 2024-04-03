import logo from "../assets/logo.webp";

const Title = () => {
	return (
		<>
			<div className="absolute left-4 top-4 text-white">
				<div className="flex items-center gap-3 opacity-50 hover:opacity-100 duration-500">
					<img src={logo} alt="DCWheel logo" className="h-10 w-auto" />
					<span>
						<h1>DCWheel v0.22.1 (Beta)</h1>
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
		</>
	);
};

export default Title;
