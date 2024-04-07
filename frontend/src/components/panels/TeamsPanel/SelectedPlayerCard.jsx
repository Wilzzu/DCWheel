import { useContext, useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import useWindowSize from "../../../hooks/useWindowSize";
import WheelContext from "../../../contexts/WheelContext";

const SelectedPlayerCard = ({ selectedPlayer, mainRef }) => {
	const { height } = useWindowSize();
	const { allPlayersDrawn } = useContext(WheelContext);
	const [mainHeight, setMainHeight] = useState(mainRef?.current?.clientHeight || 0);

	// Listen for changes in the main container's height and update the state
	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			setMainHeight(entries[0]?.borderBoxSize[0]?.blockSize);
		});

		if (mainRef?.current) resizeObserver.observe(mainRef.current);
		return () => {
			if (mainRef?.current) {
				resizeObserver.unobserve(mainRef.current);
			}
		};
	}, []);

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-3 gap-3 rounded-2xl card-dark bg-gradient-to-br border-2 z-10",
				height < mainHeight && !allPlayersDrawn && "sticky top-0" // Stick to the top when teams overflow
			)}>
			<p className="text-xl 2xl:text-2xl font-bold tracking-[0.01rem]">Selected player</p>
			{/* Player name container */}
			<div
				className={cn(
					"bg-darkBlack drop-shadow-button w-full rounded-2xl h-16 2xl:h-[4.25rem] p-2 flex items-center justify-center text-2xl 2xl:text-[1.7rem] font-bold gap-4 border-2 border-transparent duration-300",
					selectedPlayer &&
						"border-green-400 bg-gradient-to-br from-green-700 to-green-500 shadow-green-600 shadow-[0_1px_20px_-4px]"
				)}>
				{selectedPlayer && (
					<>
						{/* Image container to take space while the avatar is loading */}
						<div className="h-full w-12 aspect-square">
							<img
								className="h-full w-12 aspect-square rounded-full drop-shadow-lg duration-1000"
								src={selectedPlayer.avatar}
								alt={`${selectedPlayer.name} avatar`}
							/>
						</div>
						<p className="drop-shadow-icon truncate" title={selectedPlayer.name}>
							{selectedPlayer.name}
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default SelectedPlayerCard;
