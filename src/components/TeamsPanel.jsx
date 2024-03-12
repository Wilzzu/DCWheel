import { useContext } from "react";
import SelectedPlayerCard from "./SelectedPlayerCard";
import TeamCard from "./TeamCard";
import WheelContext from "../contexts/WheelContext";

const TeamsPanel = () => {
	const { teams, selectedPlayer } = useContext(WheelContext);

	return (
		<div className="w-full text-white flex flex-col gap-2">
			<SelectedPlayerCard selectedPlayer={selectedPlayer} />
			{/* Teams container */}
			<div className="grid grid-cols-2 gap-2">
				{teams.map((e, i) => (
					<TeamCard key={"team" + i} data={e} index={i} />
				))}
			</div>
		</div>
	);
};

export default TeamsPanel;
