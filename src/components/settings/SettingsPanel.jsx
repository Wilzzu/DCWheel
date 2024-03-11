import { cn } from "../../../lib/utils";
import TeamSize from "./TeamSize";
import SpinSpeed from "./SpinSpeed";
import PickingOrder from "./PickingOrder";

const SettingsPanel = ({ ongoing }) => {
	return (
		<div
			className={cn(
				"mt-2 w-full text-sm bg-normalBlack rounded-lg text-white flex px-2 py-1 items-center justify-between"
			)}>
			{!ongoing ? (
				<>
					<TeamSize />
					<SpinSpeed />
					<PickingOrder />
				</>
			) : (
				<>
					<SpinSpeed />
				</>
			)}
		</div>
	);
};

export default SettingsPanel;
