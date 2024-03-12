import { motion } from "framer-motion";

const MultiSelectionButton = ({ layout, name, type, icons, val, setVal }) => {
	return (
		<button
			onClick={() => setVal(type)}
			className="group relative w-10 h-8 py-1 flex items-center justify-center">
			{icons[type]}
			{/* Selected background */}
			{type === val && (
				<motion.div
					layoutId={layout}
					className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-green-500 to-green-400 rounded-lg z-[1]"
				/>
			)}
			{/* Tooltip */}
			<span className="absolute text-nowrap -top-1 opacity-0 p-2 bg-highlightBlack bg-opacity-70 backdrop-blur-sm rounded-lg group-hover:-top-8 group-hover:opacity-100 duration-300 text-xs drop-shadow-md">
				<p>{name}</p>
			</span>
		</button>
	);
};

export default MultiSelectionButton;
