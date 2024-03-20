import useClickOutside from "../../../../../hooks/useClickOutside";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import useGetChannels from "../../../../../api/useGetChannels";
import DiscordContext from "../../../../../contexts/DiscordContext";
import VCList from "./VCList";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import voiceIcon from "../../../../../assets/voiceIcon.svg";
import { cn } from "../../../../../../lib/utils";

const VCDropdown = () => {
	const { getItem } = useLocalStorage();
	const [disabled, setDisabled] = useState(false);
	const { selectedServer } = useContext(DiscordContext);

	const dropdownButton = useRef(null);
	const buttonRef = useRef(null);
	const { open, setOpen } = useClickOutside(dropdownButton, buttonRef);

	const { isLoading, isRefetching, isError, isStale, data, error, refetch } = useGetChannels(
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

	// Refetch when stale and open
	useEffect(() => {
		if (isStale && open && !disabled) refetch();
	}, [isStale, open, disabled]);

	return (
		<div className="w-1/2 h-12 flex items-center justify-start">
			{/* Voice channel dropdown button */}
			<button
				ref={dropdownButton}
				onClick={() => setOpen((prev) => !prev)}
				className={cn(
					"h-full w-full flex items-center justify-center px-4 bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack rounded-lg",
					open && "justify-between"
				)}>
				<span className="flex items-center gap-2">
					<img src={voiceIcon} alt="" className="w-5 h-auto mt-[0.1rem]" />
					Add from VC
				</span>
				{/* Refresh button */}
				{open && (
					<a
						ref={buttonRef}
						disabled={disabled}
						onClick={(e) => forceRefetch(e)}
						className="flex items-center h-full duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-30">
						<IoMdRefresh className="h-[1.35rem] w-auto" />
					</a>
				)}
			</button>

			{/* Show list of voice channels */}
			{/* TODO: Make the scrollbar look better */}
			{open && (
				<ul className="absolute top-[3.25rem] max-h-[30rem] w-3/4 p-2 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10 scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-w-2">
					<VCList
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						error={error}
						data={data}
					/>
				</ul>
			)}
		</div>
	);
};

export default VCDropdown;
