import { LuPlusCircle } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useContext, useState } from "react";
import WheelContext from "../../../../../contexts/WheelContext";

const PlayerSearchContent = ({ isLoading, isRefetching, isError, data, error }) => {
	const [searchInput, setSearchInput] = useState("");
	const { players, addPlayer } = useContext(WheelContext);

	// Filter data, check if any of the searchNames include the user input and the player isn't already in the list
	const filteredData = data?.members?.filter(
		(member) =>
			member.searchName.filter((name) => name.toLowerCase().includes(searchInput.toLowerCase()))
				.length &&
			!players?.some((player) => player.id === member.id) &&
			member
	);

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="absolute top-[3.25rem] right-0 max-h-[30rem] w-3/4 p-2 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack">
			{/* Search bar */}
			<div className="w-full flex gap-2 items-center justify-center bg-highlightBlack rounded-md px-3 py-0 mb-2 drop-shadow-button">
				<IoSearch className="w-5 h-auto" />
				<input
					type="text"
					placeholder="Search players..."
					onChange={(e) => setSearchInput(e.target.value)}
					className="h-12 w-full outline-none bg-transparent"
				/>
			</div>
			{/* Filtered list of players */}
			<ul>
				{filteredData?.map((member) => (
					<li key={member.id}>
						<button
							onClick={() => addPlayer(member)}
							className="group flex items-center w-full gap-2 p-2 hover:bg-highlightBlack rounded-md">
							<img
								src={member.avatar}
								alt={member.name + " avatar"}
								className="w-8 h-8 rounded-full"
							/>
							<p className="w-full truncate text-left" title={member.name}>
								{member.name}
							</p>
							<LuPlusCircle className="w-7 h-7 opacity-20 group-hover:opacity-100" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PlayerSearchContent;
