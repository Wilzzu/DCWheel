import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";
import { motion } from "framer-motion";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoPlayForwardOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";

const icons = {
	0: <IoPlayOutline className="w-auto h-6 z-[2] stroke-white drop-shadow-icon" />,
	1: <IoPlayForwardOutline className="w-auto h-6 z-[2] stroke-white drop-shadow-icon" />,
	2: <BsSpeedometer2 className="w-auto h-6 z-[2] fill-white drop-shadow-icon" />,
};

const SpinSpeedButton = ({ name, val }) => {
	const { spinSpeed, setSpinSpeed } = useContext(WheelContext);

	return (
		<button
			onClick={() => setSpinSpeed(val)}
			className="group relative w-10 py-1 flex items-center justify-center">
			{icons[val]}
			{/* Selected background */}
			{spinSpeed === val && (
				<motion.div
					layoutId="selectedSpeed"
					className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-green-500 to-green-400 rounded-lg z-[1]"
				/>
			)}
			{/* Tooltip */}
			<div className="absolute -top-1 opacity-0 p-2 bg-highlightBlack rounded-lg group-hover:-top-8 group-hover:opacity-100 duration-300 text-xs drop-shadow-md">
				<p>{name}</p>
			</div>
		</button>
	);
};

export default SpinSpeedButton;
