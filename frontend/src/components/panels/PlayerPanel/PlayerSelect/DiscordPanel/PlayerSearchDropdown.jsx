import { useContext, useEffect, useRef, useState } from "react";
import { cn } from "../../../../../../lib/utils";
import useGetAllMembers from "../../../../../api/useGetAllMembers";
import DiscordContext from "../../../../../contexts/DiscordContext";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import useClickOutside from "../../../../../hooks/useClickOutside";
import { IoSearch } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import PlayerSearchContent from "./PlayerSearchContent";

const PlayerSearchDropdown = () => {
	const { getItem } = useLocalStorage();
	const [disabled, setDisabled] = useState(false);
	const { selectedServer } = useContext(DiscordContext);

	const dropdownButton = useRef(null);
	const buttonRef = useRef(null);
	const { open, setOpen } = useClickOutside(dropdownButton, buttonRef);

	const { isLoading, isRefetching, isError, data, error, refetch } = useGetAllMembers(
		getItem("DCWAuth", "provider_token"),
		{ guildId: selectedServer.id }
	);

	const forceRefetch = (e) => {
		e.stopPropagation();
		refetch();
		setDisabled(true);
	};

	// Enable refresh button after some time
	useEffect(() => {
		if (!isRefetching && disabled) setTimeout(() => setDisabled(false), 5000);
	}, [isRefetching, disabled]);

	return (
		<div className="w-1/2 h-10 2xl:h-12 flex items-center justify-start">
			<button
				ref={dropdownButton}
				onClick={() => setOpen((prev) => !prev)}
				className={cn(
					"h-full w-full flex items-center justify-center px-2 2xl:px-3 bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack rounded-md 2xl:rounded-lg",
					open && "justify-between"
				)}>
				<span className="flex items-center text-xs 2xl:text-base gap-1 2xl:gap-2">
					<IoSearch className="w-4 2xl:w-5 h-auto" />
					Search players
				</span>

				{/* Refresh button */}
				{open && (
					<a
						ref={buttonRef}
						disabled={disabled}
						onClick={(e) => forceRefetch(e)}
						className="flex items-center h-full duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-30">
						<IoMdRefresh className="h-4 2xl:h-[1.35rem] w-auto" />
					</a>
				)}
			</button>

			{open && (
				<PlayerSearchContent
					isLoading={isLoading}
					isRefetching={isRefetching}
					isError={isError}
					data={data}
					error={error}
				/>
			)}
		</div>
	);
};

export default PlayerSearchDropdown;
