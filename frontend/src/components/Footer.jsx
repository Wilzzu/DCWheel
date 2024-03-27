import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Footer = () => {
	return (
		<footer className="flex justify-between items-center bg-gradient-to-b from-[#171717] to-[#1A1A1A] text-white text-sm p-4 px-8 mt-10 font-outfit">
			<div className="w-1/3 flex items-center gap-8">
				<img src={logo} alt="DCWheel logo" className="h-8 w-auto" />
				<p className="text-xs font-light">
					This is an unofficial website and is not affiliated with <b>Discord Inc.</b>
					<br />
					<b>Discord</b> is a trademark of <b>Discord Inc.</b> All other trademarks are property of
					their respective owners.
				</p>
			</div>
			<span className="flex gap-4">
				<p className="pl-1">© 2024 Wilzzu</p>
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
