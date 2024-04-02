import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { cn } from "../../../../lib/utils";
import WheelContext from "../../../contexts/WheelContext";

const TeamPlayerCard = ({ player, index, teamIndex, containerRef, setDraggedPlayerTeamIndex }) => {
	const { reorderTeams } = useContext(WheelContext);
	const [dragging, setDragging] = useState(false);
	const dragStart = () => {
		setDragging(true);
		setDraggedPlayerTeamIndex(teamIndex);
	};
	const dragEnd = (event) => {
		setDragging(false);
		setDraggedPlayerTeamIndex(null);

		// Reorder teams
		const droppedTeamIndex = event.target.dataset.teamIndex;
		if (!droppedTeamIndex || teamIndex === parseInt(droppedTeamIndex)) return;
		reorderTeams(teamIndex, parseInt(droppedTeamIndex), player);
	};
	return (
		// Draggable player card
		<motion.div
			layout="position"
			initial={{ y: index === 0 ? -2 : -8, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: index === 0 ? 0.25 : 0.35, ease: "easeInOut" }}
			drag
			dragSnapToOrigin
			dragConstraints={containerRef}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
			className={cn(
				"w-full flex items-center h-12 py-1 pl-2 pr-1 gap-2 rounded-lg touch-none z-0 bg-transparent border-2 border-transparent hover:bg-highlightBlack hover:cursor-grab",
				dragging &&
					"!z-10 bg-highlightBlack !cursor-grabbing pointer-events-none border-green-500 bg-opacity-45 backdrop-blur-sm"
			)}>
			{/* Image container to take space while the avatar is loading */}
			<div className="h-8 w-8 aspect-square">
				<img
					draggable="false"
					className="h-8 w-8 aspect-square rounded-full drop-shadow-md"
					src={player.avatar}
					alt={`${player.name} avatar`}
				/>
			</div>
			{/* Name */}
			<p
				className="truncate text-base 2k:text-xl font-semibold drop-shadow-md select-none"
				title={player.name}>
				{player.name}
			</p>
		</motion.div>
	);
};

export default TeamPlayerCard;
