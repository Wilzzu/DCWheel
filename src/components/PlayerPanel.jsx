import { useContext, useEffect, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerSelect from "./PlayerSelect";
import RemoveAllButton from "./RemoveAllButton";
import WheelContext from "../contexts/WheelContext";

const PlayerPanel = () => {
	const ref = useRef(null);
	const [lastAmount, setLastAmount] = useState(0);
	const { players, setPlayers } = useContext(WheelContext);

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
			<p className="text-center 2xl:text-lg text-white mt-6 font-semibold pb-1 border-b border-neutral-600 tracking-wide">
				PLAYERS: {players?.length || 0}
			</p>
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
