import { useContext, useRef, useState } from "react";
import SelectedPlayerCard from "./SelectedPlayerCard";
import TeamCard from "./TeamCard";
import WheelContext from "../../../contexts/WheelContext";
import EndOptions from "./EndOptions";
import { cn } from "../../../../lib/utils";
import FakeOdds from "./FakeOdds";

const TeamsPanel = ({ mainRef }) => {
	const { teams, selectedPlayer, allPlayersDrawn } = useContext(WheelContext);
	const teamsRef = useRef(null);
	const [draggedPlayerTeamIndex, setDraggedPlayerTeamIndex] = useState(null);

	return (
		<div
			className={cn(
				"w-full text-white flex flex-col gap-2",
				draggedPlayerTeamIndex !== null && "!cursor-grabbing"
			)}>
			<SelectedPlayerCard selectedPlayer={selectedPlayer} mainRef={mainRef} />
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
				{/* Fake odds */}
				{allPlayersDrawn && import.meta.env.VITE_FAKE_ODDS === "true" && <FakeOdds teams={teams} />}
			</div>
			{allPlayersDrawn && <EndOptions mainRef={mainRef} containerRef={teamsRef} />}
		</div>
	);
};

export default TeamsPanel;
