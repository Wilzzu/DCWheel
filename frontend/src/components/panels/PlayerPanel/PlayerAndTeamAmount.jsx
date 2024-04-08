import { FaRegUser } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { cn } from "../../../../lib/utils";
import WheelContext from "../../../contexts/WheelContext";
import { useContext } from "react";
import RemoveAllButton from "./RemoveAllButton";

const PlayerAndTeamAmount = () => {
	const { teamAmount, players, setPlayers, teamsNotEven } = useContext(WheelContext);

	return (
		<div className="relative flex justify-center gap-5 text-center text-white mt-1 font-semibold pb-2 border-b border-neutral-600 tracking-wide select-none">
			<div className="flex gap-1 items-center">
				<p>Players</p>
				<span className="bg-darkBlack rounded-lg p-2 min-w-[4.2rem] flex gap-2 items-center justify-center drop-shadow-button">
					<FaRegUser />
					<p>{players?.length || 0}</p>
				</span>
			</div>
			<div className="relative group flex gap-2 items-center justify-center">
				<p>Teams</p>
				<span className="bg-darkBlack rounded-lg p-2 min-w-[4.2rem] flex gap-2 items-center justify-center drop-shadow-button">
					<HiOutlineUserGroup className={cn("h-auto w-6", teamsNotEven && "stroke-[#FF5858]")} />
					<p className={teamsNotEven ? "text-[#FF5858]" : ""}>{teamAmount}</p>
				</span>
				{/* Tooltip | Due to z-index fighting, there's an additional div to always show tooltip on top of other elements */}
				{teamsNotEven && (
					<div className="absolute z-0 group-hover:z-10 flex justify-center">
						<span className="absolute text-nowrap -bottom-2 opacity-0 p-2 bg-highlightBlack rounded-lg group-hover:bottom-5 group-hover:opacity-100 duration-300 text-xs drop-shadow-md border border-red-500">
							{"Teams won't be even!"}
						</span>
					</div>
				)}
			</div>
			<RemoveAllButton players={players} setPlayers={setPlayers} />
		</div>
	);
};

export default PlayerAndTeamAmount;
