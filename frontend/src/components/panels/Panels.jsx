import { useContext } from "react";
import WheelContext from "../../contexts/WheelContext";
import PlayerPanel from "./PlayerPanel";
import TeamsPanel from "./TeamsPanel";
import SettingsPanel from "../settings/SettingsPanel";

const Panels = () => {
	const { ongoing } = useContext(WheelContext);

	return (
		<section className="max-w-[440px] 2k:max-w-[540px] w-full h-full flex flex-col justify-between">
			{ongoing ? <TeamsPanel /> : <PlayerPanel />}
			<SettingsPanel ongoing={ongoing} />
		</section>
	);
};

export default Panels;
