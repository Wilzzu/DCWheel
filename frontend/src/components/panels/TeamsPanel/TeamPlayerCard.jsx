import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import WheelContext from "../../../contexts/WheelContext";

const TeamPlayerCard = ({ player, index, teamIndex, containerRef, setDraggedPlayerTeamIndex }) => {
	const { reorderTeams, allPlayersDrawn } = useContext(WheelContext);
	const [dragging, setDragging] = useState(false);
	const animationControls = useAnimationControls();
	const dragStart = () => {
		setDragging(true);
		setDraggedPlayerTeamIndex(teamIndex);
	};

	const getDroppedTeamIndex = (event) => {
		if (event?.target?.dataset?.teamIndex) return event.target.dataset.teamIndex;

		// Mainly for touch events
		const dropX = event?.clientX || (event?.changedTouches && event.changedTouches[0].clientX);
		const dropY = event?.clientY || (event?.changedTouches && event.changedTouches[0].clientY);
		if (!dropX || !dropY) return null;

		const target = document.elementFromPoint(dropX, dropY);
		if (!target) return null;
		return target?.dataset?.teamIndex;
	};

	const dragEnd = (event) => {
		setDragging(false);
		setDraggedPlayerTeamIndex(null);

		// Reset the player card position if it's not dropped on a new team. We use animationControls since dragSnapToOrigin was unreliable
		const droppedTeamIndex = parseInt(getDroppedTeamIndex(event));
		if (isNaN(droppedTeamIndex) || teamIndex === droppedTeamIndex) {
			return animationControls.start({
				x: 0,
				y: 0,
			});
		}

		// If the player is dropped on a new team, reorder the teams
		reorderTeams(teamIndex, droppedTeamIndex, player);
	};

	useEffect(() => {
		animationControls.start({ y: 0, opacity: 1 });
	}, []);

	return (
		// Draggable player card
		<motion.div
			layout="position"
			initial={{ y: index === 0 ? -2 : -8, opacity: 0 }}
			animate={animationControls}
			transition={{ duration: index === 0 ? 0.25 : 0.35, ease: "easeInOut" }}
			drag={allPlayersDrawn}
			dragConstraints={containerRef}
			dragMomentum={false}
			onDragStart={dragStart}
			onDragEnd={dragEnd}
			className={cn(
				"w-full flex items-center h-9 2xl:h-12 py-1 pl-2 pr-1 gap-2 rounded-lg touch-none z-0 bg-transparent border-2 border-transparent",
				allPlayersDrawn && "hover:bg-highlightBlack hover:cursor-grab",
				dragging &&
					"!z-10 bg-highlightBlack pointer-events-none border-green-500 bg-opacity-45 backdrop-blur-sm"
			)}>
			{/* Image container to take space while the avatar is loading */}
			<div className="h-6 2xl:h-8 w-6 2xl:w-8 aspect-square flex-shrink-0">
				<img
					draggable="false"
					className="h-6 2xl:h-8 w-6 2xl:w-8 aspect-square rounded-full drop-shadow-md flex-shrink-0"
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
