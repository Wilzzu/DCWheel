import { useContext, useRef, useState } from "react";
import SelectedPlayerCard from "./SelectedPlayerCard";
import TeamCard from "./TeamCard";
import WheelContext from "../../../contexts/WheelContext";
import EndOptions from "./EndOptions";
import { cn } from "../../../../lib/utils";

const TeamsPanel = () => {
	const { teams, selectedPlayer, allPlayersDrawn } = useContext(WheelContext);
	const teamsRef = useRef(null);
	const [draggedPlayerTeamIndex, setDraggedPlayerTeamIndex] = useState(null);

	return (
		<div
			className={cn(
				"w-full text-white flex flex-col gap-2",
				draggedPlayerTeamIndex !== null && "!cursor-grabbing"
			)}>
			<SelectedPlayerCard selectedPlayer={selectedPlayer} />
			{/* Teams container */}
			<div ref={teamsRef} className="grid grid-cols-2 gap-2 bg-transparent">
				{teams.map((e, i) => (
					<TeamCard
						key={"team" + i}
						data={e}
						index={i}
						containerRef={teamsRef}
						draggedPlayerTeamIndex={draggedPlayerTeamIndex}
						setDraggedPlayerTeamIndex={setDraggedPlayerTeamIndex}
					/>
				))}
			</div>
			{allPlayersDrawn && <EndOptions containerRef={teamsRef} teams={teams} />}
		</div>
	);
};

export default TeamsPanel;
