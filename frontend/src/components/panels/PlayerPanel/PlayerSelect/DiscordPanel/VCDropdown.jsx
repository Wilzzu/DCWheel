import useClickOutside from "../../../../../hooks/useClickOutside";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import DiscordContext from "../../../../../contexts/DiscordContext";
import VCList from "./VCList";
import { useContext, useEffect, useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import voiceIcon from "../../../../../assets/voiceIcon.svg";
import { cn } from "../../../../../../lib/utils";
import useGetVoiceChannels from "../../../../../api/useGetVoiceChannels";

const VCDropdown = () => {
	const { getItem } = useLocalStorage();
	const [disabled, setDisabled] = useState(false);
	const { selectedServer } = useContext(DiscordContext);

	const dropdownButton = useRef(null);
	const buttonRef = useRef(null);
	const { open, setOpen } = useClickOutside(dropdownButton, buttonRef);

	const { isLoading, isRefetching, isError, isStale, data, error, refetch } = useGetVoiceChannels(
		getItem("DCWAuth", "provider_token"),
		{ guildId: selectedServer.id }
	);

	// Show loading when force refetching
	const [showLoading, setShowLoading] = useState(true);

	const forceRefetch = (e) => {
		e.stopPropagation();
		refetch();
		setDisabled(true);
		setShowLoading(true);
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
		<div className="w-1/2 h-10 2xl:h-12 text-xs 2xl:text-base flex items-center justify-start">
			{/* Voice channel dropdown button */}
			<button
				ref={dropdownButton}
				onClick={() => setOpen((prev) => !prev)}
				className={cn(
					"h-full w-full flex items-center justify-center px-2 2xl:px-4 bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack rounded-md 2xl:rounded-lg",
					open && "justify-between"
				)}>
				<span className="flex items-center gap-2">
					<img src={voiceIcon} alt="Add from VC icon" className="w-4 2xl:w-5 h-auto mt-[0.1rem]" />
					Add from VC
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

			{/* Show list of voice channels */}
			{open && (
				<ul className="absolute top-11 2xl:top-[3.25rem] max-h-[10rem] lg:max-h-[30rem] w-3/4 p-1 2xl:p-2 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10 scrollbar scrollbar-w-1 2xl:scrollbar-w-2 scrollbar-thumb-green-500 scrollbar-thumb-rounded-full">
					<VCList
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						error={error}
						data={data}
						showLoading={showLoading}
						setShowLoading={setShowLoading}
					/>
				</ul>
			)}
		</div>
	);
};

export default VCDropdown;
