import { motion } from "framer-motion";
import useLocalStorage from "../../hooks/useLocalStorage";

const MultiSelectionButton = ({ layout, name, type, icons, val, setVal, localKey, localItem }) => {
	const { setItem } = useLocalStorage();

	// Save the value in Context API and local storage
	const setAndSaveValue = () => {
		setVal(type);
		setItem(localKey, localItem, type);
	};

	return (
		<button
			onClick={setAndSaveValue}
			className="group relative w-8 2xl:w-10 h-6 2xl:h-8 py-1 flex items-center justify-center">
			{icons[type]}
			{/* Selected background */}
			{type === val && (
				<motion.div
					layoutId={layout}
					className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-br from-green-500 to-green-400 rounded-md 2xl:rounded-lg z-[1]"
				/>
			)}
			{/* Tooltip */}
			<span className="absolute pointer-events-none text-nowrap whitespace-nowrap -top-1 opacity-0 p-[0.4rem] 2xl:p-2 bg-highlightBlack rounded-md 2xl:rounded-lg group-hover:-top-8 2xl:group-hover:-top-9 group-hover:opacity-100 duration-300 group-hover:text-xs text-[6px] 2xl:text-[10px]">
				<p>{name}</p>
			</span>
		</button>
	);
};

export default MultiSelectionButton;
