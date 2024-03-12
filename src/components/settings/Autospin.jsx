import { useContext } from "react";
import { MdRestartAlt } from "react-icons/md";
import WheelContext from "../../contexts/WheelContext";
import { cn } from "../../../lib/utils";

const Autospin = () => {
	const { autospin, setAutospin } = useContext(WheelContext);
	return (
		<div className="flex flex-col items-center">
			<p>Auto-spin</p>
			<button
				onClick={() => setAutospin((prev) => !prev)}
				className={cn(
					"flex items-center bg-darkBlack rounded-lg px-1 h-10 duration-200 hover:bg-neutral-700",
					autospin && "bg-green-500 hover:bg-green-600"
				)}>
				<MdRestartAlt className="h-6 w-auto drop-shadow-icon" />
				<p className="w-7 drop-shadow-icon">{autospin ? "On" : "Off"}</p>
			</button>
		</div>
	);
};

export default Autospin;
