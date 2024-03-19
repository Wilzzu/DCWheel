import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from "react";

const GDPRPopup = () => {
	const { getItem, setItem } = useLocalStorage();
	const [accepted, setAccepted] = useState(getItem("GDPR", "accepted"));

	const handleAccept = () => {
		setItem("GDPR", "accepted", true);
		setAccepted(true);
	};

	if (accepted) return null;

	return (
		<motion.div className="absolute p-6 gap-4 flex bottom-14 left-14 bg-green-600 rounded-xl text-white drop-shadow-2xl z-50">
			<div className="flex gap-6">
				<p className="drop-shadow-text">
					This site uses local storage to save your preferences. We also use trusted external <br />
					providers who use cookies for secure login functionality and website protection.
				</p>
				{/* Buttons */}
				<span className="flex border-l pl-3">
					<Link to="/privacy" className="h-full hover:bg-green-700 p-3 rounded-lg duration-150">
						<p className="drop-shadow-text">Learn more</p>
					</Link>
					<button
						onClick={handleAccept}
						className="h-full hover:bg-green-700 p-3 rounded-lg duration-150">
						<p className="drop-shadow-text">Ok, got it!</p>
					</button>
				</span>
			</div>
		</motion.div>
	);
};

export default GDPRPopup;
