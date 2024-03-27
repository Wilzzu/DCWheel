import { useContext, useRef } from "react";
import SelectedPlayerCard from "./SelectedPlayerCard";
import TeamCard from "./TeamCard";
import WheelContext from "../../../contexts/WheelContext";
import EndOptions from "./EndOptions";

const TeamsPanel = () => {
	const { teams, selectedPlayer, allPlayersDrawn } = useContext(WheelContext);
	const teamsRef = useRef(null);

	return (
		<div className="w-full text-white flex flex-col gap-2">
			<SelectedPlayerCard selectedPlayer={selectedPlayer} />
			{/* Teams container */}
			<div ref={teamsRef} className="grid grid-cols-2 gap-2 bg-transparent">
				{teams.map((e, i) => (
					<TeamCard key={"team" + i} data={e} index={i} />
				))}
			</div>
			{allPlayersDrawn && <EndOptions containerRef={teamsRef} />}
		</div>
	);
};

export default TeamsPanel;
