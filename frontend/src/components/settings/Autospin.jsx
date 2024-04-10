import { useContext } from "react";
import { MdRestartAlt } from "react-icons/md";
import WheelContext from "../../contexts/WheelContext";
import { cn } from "../../../lib/utils";
import useLocalStorage from "../../hooks/useLocalStorage";

const Autospin = () => {
	const { autospin, setAutospin } = useContext(WheelContext);
	const { setItem } = useLocalStorage();

	// Save the value in Context API and local storage
	const setAndSaveValue = () => {
		setItem("wheelSettings", "autospin", !autospin);
		setAutospin((prev) => !prev);
	};
	return (
		<div className="flex flex-col items-center">
			<p>Auto-spin</p>
			<button
				onClick={setAndSaveValue}
				className={cn(
					"flex items-center bg-darkBlack rounded-md 2xl:rounded-lg px-1 h-8 2xl:h-10 duration-200 hover:bg-neutral-700 drop-shadow-icon",
					autospin && "bg-green-500 hover:bg-green-600"
				)}>
				<MdRestartAlt className="h-5 2xl:h-6 w-auto drop-shadow-icon" />
				<p className="w-6 2xl:w-7 drop-shadow-icon">{autospin ? "On" : "Off"}</p>
			</button>
		</div>
	);
};

export default Autospin;
