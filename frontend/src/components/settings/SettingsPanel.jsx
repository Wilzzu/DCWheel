import { cn } from "../../../lib/utils";
import TeamSize from "./TeamSize";
import SpinSpeed from "./SpinSpeed";
import PickingOrder from "./PickingOrder";
import Autospin from "./Autospin";
import ReturnToMenu from "./ReturnToMenu";
import Mute from "./Mute";

const SettingsPanel = ({ ongoing }) => {
	return (
		<div
			className={cn(
				"mt-2 w-full text-xs 2k:text-sm bg-gradient-to-r from-normalBlack to-highlightBlack rounded-lg text-white flex px-2 py-1 items-center justify-between border-4 border-highlightBlack shadow-xl shadow-[#1E1E1E] z-10"
			)}>
			{/* Settings items */}
			{!ongoing ? (
				<>
					<TeamSize />
					<SpinSpeed layout="speedMenu" />
					<PickingOrder />
					<Mute />
				</>
			) : (
				<>
					<SpinSpeed layout="speedOngoing" />
					<Autospin />
					<Mute />
					<ReturnToMenu />
				</>
			)}
		</div>
	);
};

export default SettingsPanel;
