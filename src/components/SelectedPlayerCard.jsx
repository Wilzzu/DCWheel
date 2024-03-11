import { cn } from "../../lib/utils";

const SelectedPlayerCard = (props) => {
	return (
		<div className="bg-normalBlack rounded-2xl flex flex-col items-center justify-center p-3 gap-3">
			<p className="text-xl 2xl:text-2xl font-bold tracking-[0.01rem]">Selected player:</p>
			{/* Player name container */}
			<div
				className={cn(
					"bg-darkBlack w-full rounded-2xl h-16 2xl:h-[4.25rem] p-2 flex items-center justify-center text-2xl 2xl:text-[1.7rem] font-bold gap-4 border-2 border-transparent duration-300",
					props.selectedPlayer &&
						"border-green-500 bg-green-800 shadow-green-600 shadow-[0_1px_20px_-4px]"
				)}>
				{props.selectedPlayer && (
					<>
						{/* Image container to take space while the image is loading */}
						<div className="h-full aspect-square">
							<img
								className="h-full rounded-full drop-shadow-lg duration-1000"
								src={props.selectedPlayer.image}
								alt={`${props.selectedPlayer.name} image`}
							/>
						</div>
						<p className="drop-shadow-lg truncate">{props.selectedPlayer.name}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default SelectedPlayerCard;
