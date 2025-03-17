import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Footer = () => {
	return (
		<footer className="flex gap-2 justify-between items-center bg-gradient-to-b from-[#171717] to-[#1A1A1A] text-white text-sm p-4 px-8 mt-10 font-outfit">
			<div className="lg:w-1/3 flex flex-col lg:flex-row items-center gap-2 lg:gap-8">
				<img src={logo} alt="DCWheel logo" className="h-10 lg:h-8 w-auto" />
				<p className="text-xs font-light text-center lg:text-left">
					This is an unofficial website and is not affiliated with <b>Discord Inc.</b>
					<br />
					<b>Discord</b> is a trademark of <b>Discord Inc.</b> All other trademarks are property of
					their respective owners.
				</p>
			</div>
			<span className="text-nowrap items-center flex flex-col-reverse lg:flex-row gap-2 lg:gap-4">
				<a
					href="https://github.com/Wilzzu"
					target="_blank"
					rel="noreferrer"
					className="pl-1 decoration-1 hover:underline">
					© 2024-2025 Wilzzu
				</a>
				<p className="underline">
					<Link to="/privacy" reloadDocument={true}>
						Privacy Policy
					</Link>
				</p>
			</span>
		</footer>
	);
};

export default Footer;
