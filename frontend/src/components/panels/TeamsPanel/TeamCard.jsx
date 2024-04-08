import { motion } from "framer-motion";
import WheelContext from "../../../contexts/WheelContext";
import { useContext } from "react";
import { cn } from "../../../../lib/utils";
import TeamPlayerCard from "./TeamPlayerCard";

const TeamCard = ({
	data,
	index,
	containerRef,
	draggedPlayerTeamIndex,
	setDraggedPlayerTeamIndex,
}) => {
	const { allPlayersDrawn } = useContext(WheelContext);

	return (
		<motion.div
			layout
			data-team-index={index}
			className={cn(
				"w-full h-fit rounded-xl flex flex-col gap-2 p-3 card-dark bg-gradient-to-tr border-2 team-card overflow-hidden",
				allPlayersDrawn && "overflow-visible",
				draggedPlayerTeamIndex !== null &&
					draggedPlayerTeamIndex !== index &&
					"outline-green-500/50 outline-dashed hover:outline-green-500 hover:outline"
			)}>
			{/* Team name */}
			<motion.p
				layout="position"
				initial={{ y: 2, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.25, ease: "easeInOut" }}
				className="text-lg 2k:text-xl font-semibold text-center pointer-events-none select-none">
				Team {index + 1}
			</motion.p>
			{/* Players */}
			<motion.ul
				className={cn(
					"w-full flex flex-col gap-2",
					draggedPlayerTeamIndex !== null && "pointer-events-none"
				)}>
				{data.map((e, i) => (
					<TeamPlayerCard
						key={"TeamPlayer" + e?.id}
						player={e}
						index={i}
						teamIndex={index}
						containerRef={containerRef}
						setDraggedPlayerTeamIndex={setDraggedPlayerTeamIndex}
					/>
				))}
			</motion.ul>
		</motion.div>
	);
};

export default TeamCard;
