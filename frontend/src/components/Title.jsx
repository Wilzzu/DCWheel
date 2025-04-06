import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

const Title = () => {
	return (
		<>
			<div className="lg:absolute lg:h-full mt-2 lg:mt-0 mb-4 lg:mb-0 left-3 top-3 text-white text-sm lg:text-base">
				{/* Stick with the wheel */}
				<div className="lg:sticky lg:top-3 lg:h-dvh">
					<div className="flex items-center gap-3 opacity-50 hover:opacity-100 duration-500">
						<Link to="/" reloadDocument>
							<img src={logo} alt="DCWheel logo" className="h-9 lg:h-10 w-auto" />
						</Link>
						<span>
							<Link to="/" reloadDocument>
								DCWheel
							</Link>
							<p className="text-xs">
								Made with 💚 by{" "}
								<a
									href="https://github.com/Wilzzu"
									target="_blank"
									rel="noreferrer"
									className="lg:text-sm font-bold underline decoration-1 hover:decoration-2 text-green-500 hover:text-green-400 hover:tracking-wider duration-500">
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
