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
		// Overflow hidden container
		<div className="w-full h-full absolute left-0 top-0 pointer-events-none overflow-hidden">
			{/* Popup */}
			<motion.div
				initial={{ y: 200, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 60, delay: 0.5 }}
				className="absolute p-6 gap-4 flex bottom-14 left-14 bg-green-600 rounded-xl text-white drop-shadow-icon z-50 pointer-events-auto">
				<div className="flex gap-6">
					<p className="drop-shadow-text">
						This site uses local storage to save your preferences. We also use trusted external{" "}
						<br />
						providers who utilize cookies for secure login functionality and website protection.
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
		</div>
	);
};

export default GDPRPopup;
