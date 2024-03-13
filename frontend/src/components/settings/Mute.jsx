import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";
import { LuVolumeX } from "react-icons/lu";
import { cn } from "../../../lib/utils";
import useLocalStorage from "../../hooks/useLocalStorage";

const Mute = () => {
	const { mute, setMute } = useContext(WheelContext);
	const { setItem } = useLocalStorage();

	// Save the value in Context API and local storage
	const setAndSaveValue = () => {
		setItem("wheelSettings", "mute", !mute);
		setMute((prev) => !prev);
	};

	return (
		<div className="relative flex flex-col items-center">
			<p>Mute</p>
			<button
				onClick={setAndSaveValue}
				className={cn(
					"flex items-center justify-center bg-darkBlack rounded-lg h-10 w-10 duration-200 hover:bg-neutral-700",
					mute && "bg-red-500 hover:bg-red-600"
				)}>
				<LuVolumeX className="h-6 w-auto drop-shadow-icon" />
			</button>
		</div>
	);
};

export default Mute;
