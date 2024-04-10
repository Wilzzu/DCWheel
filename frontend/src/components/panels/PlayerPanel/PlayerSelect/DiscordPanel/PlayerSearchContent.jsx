import { IoSearch } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import WheelContext from "../../../../../contexts/WheelContext";
import PlayerSearchList from "./PlayerSearchList";

const PlayerSearchContent = ({ isLoading, isRefetching, isError, data, error }) => {
	const [searchInput, setSearchInput] = useState("");
	const { players, addPlayer } = useContext(WheelContext);
	const inputRef = useRef(null);

	// Focus on input when dropdown is opened
	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

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
			className="absolute top-11 2xl:top-[3.25rem] right-0 w-3/4 p-2 bg-darkBlack rounded-md border-2 border-highlightBlack">
			{/* Search bar */}
			<div className="w-full flex gap-2 items-center justify-center bg-highlightBlack rounded-md px-3 py-0 mb-2 drop-shadow-button">
				<IoSearch className="w-5 h-auto" />
				<input
					ref={inputRef}
					type="text"
					placeholder="Search players..."
					onChange={(e) => setSearchInput(e.target.value)}
					className="h-10 2xl:h-12 w-full outline-none bg-transparent"
				/>
			</div>
			{/* Filtered list of players */}
			<div className="max-h-[30rem] overflow-y-auto scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-w-2 pr-1">
				<PlayerSearchList
					data={filteredData}
					searchInput={searchInput}
					addPlayer={addPlayer}
					isLoading={isLoading}
					isRefetching={isRefetching}
					isError={isError}
					error={error}
				/>
			</div>
		</div>
	);
};

export default PlayerSearchContent;
