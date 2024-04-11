import { motion } from "framer-motion";
import WheelContext from "../../contexts/WheelContext";
import { useContext } from "react";

const EndWarning = ({ setEndWarning, setCanSpin }) => {
	const { returnToStart } = useContext(WheelContext);

	const handleClick = (accepted) => {
		setEndWarning(false);
		setCanSpin(true);

		if (accepted) returnToStart();
	};

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				y: { type: "spring", stiffness: 140, damping: 14 },
				opacity: { duration: 0.2 },
			}}
			className="absolute w-full lg:w-1/2 h-36 lg:h-1/5 bg-normalBlack rounded-2xl shadow-xl flex flex-col items-center justify-center bg-opacity-90 backdrop-blur-lg text-white gap-2 p-2 lg:p-5 pointer-events-auto">
			<p className="text-base lg:text-lg 2k:text-xl">Return to player select?</p>
			{/* Selection buttons */}
			<div className="w-full flex gap-2 text-lg 2k:text-xl drop-shadow-md">
				<button
					onClick={() => handleClick(true)}
					className="relative group w-full py-4 shadow-3xl hover:shadow-green-800 duration-150">
					<div className="absolute group rounded-xl w-full h-full top-0 bg-gradient-to-br from-green-700 to-green-500 border-2 border-green-500 duration-150 opacity-90 group-hover:opacity-100"></div>
					<p className="drop-shadow-md">Yes</p>
				</button>
				<button
					onClick={() => handleClick(false)}
					className="relative group w-full rounded-xl py-4 shadow-3xl bg-opacity-90 hover:shadow-red-800 duration-150">
					<div className="absolute group rounded-xl w-full h-full top-0 bg-gradient-to-br from-red-700 to-red-500 border-2 border-red-500 duration-150 opacity-90 group-hover:opacity-100"></div>
					<p className="drop-shadow-md">Cancel</p>
				</button>
			</div>
		</motion.div>
	);
};

export default EndWarning;
