import { useContext, useEffect, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerSelect from "./PlayerSelect";
import RemoveAllButton from "./RemoveAllButton";
import WheelContext from "../contexts/WheelContext";

const PlayerPanel = () => {
	const ref = useRef(null);
	const [lastAmount, setLastAmount] = useState(0);
	const { teamAmount, players, setPlayers, teamsNotEven } = useContext(WheelContext);

	// Scroll to bottom when new player is added
	useEffect(() => {
		// If player removed, do nothing
		if (players.length < lastAmount) return setLastAmount(players.length);
		ref.current.scrollTop = ref.current.scrollHeight;
		setLastAmount(players.length);
	}, [players]);

	return (
		<div className="relative w-full h-full flex flex-col gap-2 p-5 rounded-2xl bg-gradient-to-br from-darkBlack to-highlightBlack border-4 border-highlightBlack overflow-hidden shadow-3xl shadow-normalBlack">
			<PlayerSelect />
			{/* Amount */}
			<div className="flex justify-center gap-5 text-center 2xl:text-lg text-white mt-6 font-semibold pb-1 border-b border-neutral-600 tracking-wide select-none">
				<p>PLAYERS: {players?.length || 0}</p>
				<span className="relative group flex justify-center">
					<p>
						TEAMS: {teamAmount} {teamsNotEven ? "❌" : "✔"}
					</p>
					{teamsNotEven && (
						<span className="absolute text-nowrap -top-1 opacity-0 p-2 bg-highlightBlack rounded-lg group-hover:-top-9 group-hover:opacity-100 duration-300 text-xs drop-shadow-md border border-red-500">
							{"Teams won't be even!"}
						</span>
					)}
				</span>
			</div>
			{/* List players */}
			<ul
				ref={ref}
				className="flex flex-col gap-1 h-full overflow-auto scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-w-2 pr-2">
				{players?.map((e) => (
					<PlayerCard key={e.id} player={e} />
				))}
			</ul>
			<RemoveAllButton players={players} setPlayers={setPlayers} />
		</div>
	);
};

export default PlayerPanel;
