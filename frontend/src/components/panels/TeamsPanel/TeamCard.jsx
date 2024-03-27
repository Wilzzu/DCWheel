import { motion } from "framer-motion";
import WheelContext from "../../../contexts/WheelContext";
import { useContext, useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";

const TeamCard = ({ data, index }) => {
	const [addDuration, setAddDuration] = useState(false);
	const { allPlayersDrawn } = useContext(WheelContext);

	// Add duration after all players have been drawn
	useEffect(() => {
		if (!allPlayersDrawn) return;
		setTimeout(() => {
			setAddDuration(true);
		}, 500);
	}, [allPlayersDrawn]);

	return (
		<motion.div
			layout
			className={cn(
				"w-full h-fit rounded-xl flex flex-col gap-2 p-3 overflow-hidden card-dark bg-gradient-to-tr border-2 team-card",
				addDuration && "duration-[10s] ease-in-out" // This is to hide the border color changing when taking screenshot
			)}>
			<motion.p
				layout="position"
				initial={{ y: 2, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.25, ease: "easeInOut" }}
				className="text-lg 2k:text-xl font-semibold text-center">
				Team {index + 1}
			</motion.p>
			<ul className="w-full flex flex-col gap-2">
				{data.map((e, i) => (
					// Player card
					<motion.li
						layout="position"
						initial={{ y: i === 0 ? -2 : -8, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: i === 0 ? 0.25 : 0.35, ease: "easeInOut" }}
						key={"TeamPlayer" + e.id}
						className="w-full flex items-center h-12 py-1 pl-2 pr-1 gap-2 rounded-lg">
						{/* Image container to take space while the avatar is loading */}
						<div className="h-8 w-8 aspect-square">
							<img
								className="h-8 w-8 aspect-square rounded-full drop-shadow-md"
								src={e.avatar}
								alt={`${e.name} avatar`}
							/>
						</div>
						{/* Name */}
						<p
							className="truncate text-base 2k:text-xl font-semibold drop-shadow-md"
							title={e.name}>
							{e.name}
						</p>
					</motion.li>
				))}
			</ul>
		</motion.div>
	);
};

export default TeamCard;
