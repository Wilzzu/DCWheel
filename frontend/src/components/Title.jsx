import { Link } from "react-router-dom";

const Title = () => {
	return (
		<div className="absolute left-4 top-4 text-white">
			<div className="opacity-50 hover:opacity-100 duration-500">
				<h1>DCWheel v0.16.1 (Beta)</h1>
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
			</div>
			<Link
				to="/privacy"
				className="text-xs font-light opacity-50 hover:opacity-100 duration-150 underline">
				Privacy Policy
			</Link>
		</div>
	);
};

export default Title;
