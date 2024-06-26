import { FaRegUser } from "react-icons/fa";
import { LuPlusCircle } from "react-icons/lu";
import { HiOutlineVolumeUp } from "react-icons/hi";
import WheelContext from "../../../../../contexts/WheelContext";
import { useContext, useState } from "react";
import { cn } from "../../../../../../lib/utils";

const VCCard = ({ channel }) => {
	const { addPlayer, players } = useContext(WheelContext);
	const [isLoaded, setIsLoaded] = useState(false);

	// Add all players from the channel to the player list
	const addVCPlayers = () => {
		channel.members.forEach((member) => addPlayer(member));
	};

	return (
		<button
			onClick={addVCPlayers}
			className="relative group w-full p-2 2xl:p-3 hover:bg-highlightBlack rounded 2xl:rounded-md">
			{/* Channel name and member amount */}
			<span className="flex justify-between border-b-2 border-highlightBlack mb-2">
				<span className="flex gap-1 items-center">
					<HiOutlineVolumeUp className="h-[1.3rem] w-auto aspect-square" />
					<p className="w-full truncate">{channel.name}</p>
				</span>
				<span className="flex gap-1 items-center justify-center">
					<FaRegUser className="h-[0.62rem] mb-[0.12rem] 2xl:mb-0 2xl:h-3 w-auto aspect-square" />
					<p>{channel.members.length}</p>
				</span>
			</span>

			{/* List of members */}
			<ul className="flex flex-wrap items-center">
				{channel.members.map((member) => (
					<li
						key={member.id}
						className={cn(
							"flex items-center gap-1 2xl:gap-2 p-1",
							players.find((e) => e.id === member.id) && "opacity-30"
						)}>
						<img
							src={member.avatar}
							alt={member.name + " avatar"}
							className="h-5 2xl:h-7 w-5 2xl:w-7 aspect-square rounded-full"
							loading="lazy"
							onLoad={() => setIsLoaded(true)}
						/>
						{!isLoaded && (
							<div className="absolute h-5 2xl:h-7 w-5 2xl:w-7 aspect-square bg-neutral-700 rounded-full animate-pulse" />
						)}
					</li>
				))}
			</ul>
			{/* Show add icon on hover and blur background */}
			<span className="hidden absolute top-0 left-0 group-hover:flex items-center justify-center w-full h-full backdrop-blur-[0.08rem]">
				<LuPlusCircle className="w-auto h-6 2xl:h-10 aspect-square drop-shadow-3xl" />
			</span>
		</button>
	);
};

export default VCCard;
