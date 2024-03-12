import { useContext, useEffect, useRef, useState } from "react";
import PlayerCard from "../PlayerCard";
import PlayerSelect from "../PlayerSelect";
import RemoveAllButton from "../RemoveAllButton";
import WheelContext from "../../contexts/WheelContext";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { cn } from "../../../lib/utils";
import { AnimatePresence } from "framer-motion";

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
		<div className="relative w-full h-full flex flex-col gap-2 p-5 rounded-2xl overflow-hidden card-dark bg-gradient-to-br border-4">
			<PlayerSelect />
			{/* Amount */}
			<div className="flex justify-center gap-5 text-center text-white mt-4 font-semibold pb-2 border-b border-neutral-600 tracking-wide select-none">
				<div className="flex gap-1 items-center">
					<p>Players</p>
					<span className="bg-darkBlack rounded-lg p-2 min-w-[4.2rem] flex gap-2 items-center justify-center">
						<FaRegUser />
						<p>{players?.length || 0}</p>
					</span>
				</div>
				<div className="relative group flex gap-2 items-center justify-center">
					<p>Teams</p>
					<span className="bg-darkBlack rounded-lg p-2 min-w-[4.2rem] flex gap-2 items-center justify-center">
						<HiOutlineUserGroup className={cn("h-auto w-6", teamsNotEven && "stroke-[#FF5858]")} />
						<p className={teamsNotEven ? "text-[#FF5858]" : ""}>{teamAmount}</p>
					</span>
					{/* {teamsNotEven ? "❌" : "✔"} */}
					{teamsNotEven && (
						<span className="absolute text-nowrap -top-1 opacity-0 p-2 bg-highlightBlack rounded-lg group-hover:-top-9 group-hover:opacity-100 duration-300 text-xs drop-shadow-md border border-red-500">
							{"Teams won't be even!"}
						</span>
					)}
				</div>
			</div>
			{/* List players */}
			<ul
				ref={ref}
				className="flex flex-col gap-1 h-full overflow-auto scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-w-2 pr-2">
				<AnimatePresence>
					{players?.map((e) => (
						<PlayerCard key={e.id} player={e} />
					))}
				</AnimatePresence>
			</ul>
			<RemoveAllButton players={players} setPlayers={setPlayers} />
		</div>
	);
};

export default PlayerPanel;
