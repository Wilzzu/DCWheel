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
		<div className="w-full h-full min-h-[64dvh] lg:min-h-0 flex flex-col gap-2 rounded-2xl overflow-hidden card-dark bg-gradient-to-br border-2 2xl:border-4 text-sm 2xl:text-base">
			{/* Top part container */}
			<div className="relative flex flex-col gap-2 p-5 pb-0">
				<PlayerSelect />
				<PlayerAndTeamAmount />
			</div>

			{/* Player list container */}
			<div className="h-full p-3 pt-0 pb-2 overflow-hidden">
				<ul
					ref={ref}
					className="flex flex-col gap-1 h-full px-2 overflow-auto scrollbar scrollbar-w-1 2xl:scrollbar-w-2 scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
					<AnimatePresence>
						{players?.map((e) => (
							<PlayerCard key={e.id} player={e} />
						))}
					</AnimatePresence>
				</ul>
			</div>
		</div>
	);
};

export default PlayerPanel;
