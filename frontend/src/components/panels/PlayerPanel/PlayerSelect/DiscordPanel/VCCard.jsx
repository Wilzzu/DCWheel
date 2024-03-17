import { FaRegUser } from "react-icons/fa";
import { LuPlusCircle } from "react-icons/lu";
import { HiOutlineVolumeUp } from "react-icons/hi";

const VCCard = ({ channel }) => {
	return (
		<button className="relative group w-full p-3 hover:bg-highlightBlack rounded-md">
			{/* Channel name and member amount */}
			<span className="flex justify-between border-b-2 border-highlightBlack mb-1">
				<span className="flex gap-1 items-center">
					<HiOutlineVolumeUp className="h-[1.3rem] w-auto aspect-square" />
					<p className="w-full truncate">{channel.name}</p>
				</span>
				<span className="flex gap-1 items-center justify-center">
					<FaRegUser className="h-3 w-auto aspect-square" />
					<p>{channel.members.length}</p>
				</span>
			</span>

			{/* List of members */}
			<ul className="flex flex-wrap items-center">
				{channel.members.map((member) => (
					<li key={member.id} className="flex items-center gap-2 p-1">
						<img
							src={member.avatar}
							alt={member.name + " avatar"}
							className="h-7 w-auto aspect-square rounded-full"
						/>
					</li>
				))}
			</ul>
			{/* Show add icon on hover and blur background */}
			<span className="hidden absolute top-0 left-0 group-hover:flex items-center justify-center w-full h-full backdrop-blur-[0.1rem]">
				<LuPlusCircle className="w-auto h-10 aspect-square drop-shadow-3xl" />
			</span>
		</button>
	);
};

export default VCCard;
