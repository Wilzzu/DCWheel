import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";
import { LuVolumeX } from "react-icons/lu";
import { cn } from "../../../lib/utils";

const Mute = () => {
	const { mute, setMute } = useContext(WheelContext);

	return (
		<div className="relative flex flex-col items-center">
			<p>Mute</p>
			<button
				onClick={() => setMute((prev) => !prev)}
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
