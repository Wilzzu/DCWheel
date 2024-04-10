import { useContext, useEffect, useRef, useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerSelect from "./PlayerSelect/PlayerSelect";
import WheelContext from "../../../contexts/WheelContext";
import { AnimatePresence } from "framer-motion";
import PlayerAndTeamAmount from "./PlayerAndTeamAmount";

const PlayerPanel = () => {
	const ref = useRef(null);
	const [lastAmount, setLastAmount] = useState(0);
	const { players } = useContext(WheelContext);

	// Scroll to bottom when new player is added
	useEffect(() => {
		// If player removed, do nothing
		if (players.length < lastAmount) return setLastAmount(players.length);
		ref.current.scrollTop = ref.current.scrollHeight;
		setLastAmount(players.length);
	}, [players]);

	return (
		<div className="relative w-full h-full flex flex-col gap-2 p-5 pb-2 rounded-2xl overflow-hidden card-dark bg-gradient-to-br border-2 2xl:border-4 text-sm 2xl:text-base">
			<PlayerSelect />
			<PlayerAndTeamAmount />
			{/* List players */}
			<ul
				ref={ref}
				className="flex flex-col gap-1 h-full overflow-auto scrollbar scrollbar-w-1 2xl:scrollbar-w-2 scrollbar-thumb-green-500 scrollbar-thumb-rounded-full pr-2">
				<AnimatePresence>
					{players?.map((e) => (
						<PlayerCard key={e.id} player={e} />
					))}
				</AnimatePresence>
			</ul>
		</div>
	);
};

export default PlayerPanel;
