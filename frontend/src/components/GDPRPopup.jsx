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
		<div className="w-full h-full absolute left-0 top-0 pointer-events-none overflow-hidden text-sm 2xl:text-base">
			{/* Popup */}
			<motion.div
				initial={{ y: 200, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 60, delay: 0.5 }}
				className="absolute p-4 pb-2 lg:pb-4 2xl:p-6 gap-4 flex bottom-6 lg:bottom-14 lg:left-14 bg-green-600 rounded-md 2xl:rounded-xl text-white drop-shadow-icon z-50 pointer-events-auto">
				<div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
					<p className="drop-shadow-text">
						This site uses local storage to save your preferences. We also use trusted external{" "}
						<br className="hidden lg:inline-block" />
						providers who utilize cookies for secure login functionality and website protection.
					</p>
					{/* Buttons */}
					<span className="flex gap-2 lg:gap-0 border-t pt-2 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-3">
						<Link
							to="/privacy"
							reloadDocument={true}
							className="h-full w-full text-center bg-green-700 lg:bg-transparent hover:bg-green-500 lg:hover:bg-green-700 p-3 rounded-lg duration-150 text-nowrap">
							<p className="drop-shadow-text">Learn more</p>
						</Link>
						<button
							onClick={handleAccept}
							className="h-full w-full text-center bg-green-700 lg:bg-transparent hover:bg-green-500 lg:hover:bg-green-700 p-3 rounded-lg duration-150 text-nowrap">
							<p className="drop-shadow-text">Ok, got it!</p>
						</button>
					</span>
				</div>
			</motion.div>
		</div>
	);
};

export default GDPRPopup;
