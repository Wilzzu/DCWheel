import SelectedPlayerCard from "./SelectedPlayerCard";
import TeamCard from "./TeamCard";

const TeamsPanel = (props) => {
	return (
		<div className="w-full text-white flex flex-col gap-2">
			<SelectedPlayerCard selectedPlayer={props.selectedPlayer} />
			{/* Teams container */}
			<div className="grid grid-cols-2 gap-2">
				{props.teams.map((e, i) => (
					<TeamCard key={"team" + i} data={e} number={i} />
				))}
			</div>
		</div>
	);
};

export default TeamsPanel;
