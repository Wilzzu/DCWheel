import { cn } from "../../../../lib/utils";

const SelectedPlayerCard = ({ selectedPlayer }) => {
	return (
		<div className="flex flex-col items-center justify-center p-3 gap-3 rounded-2xl card-dark bg-gradient-to-br border-2">
			<p className="text-xl 2xl:text-2xl font-bold tracking-[0.01rem]">Selected player</p>
			{/* Player name container */}
			<div
				className={cn(
					"bg-darkBlack w-full rounded-2xl h-16 2xl:h-[4.25rem] p-2 flex items-center justify-center text-2xl 2xl:text-[1.7rem] font-bold gap-4 border-2 border-transparent duration-300",
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
