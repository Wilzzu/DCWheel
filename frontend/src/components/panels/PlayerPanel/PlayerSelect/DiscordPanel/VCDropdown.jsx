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

	const toggleVC = () => {
		setOpen((prev) => !prev);
	};

	const forceRefetch = () => {
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
		<div
			className={cn(
				"relative grow h-12 text-white flex items-center justify-start",
				open && "w-full"
			)}>
			{/* Server select dropdown button */}
			<button
				ref={dropdownButton}
				onClick={toggleVC}
				className={cn(
					"h-full w-full flex items-center justify-center px-4 bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack rounded-lg",
					open && "justify-start"
				)}>
				<span className="flex items-center gap-2">
					{/* <HiOutlineVolumeUp className="h-5 w-auto" /> */}
					<img src={voiceIcon} alt="" className="w-5 h-auto mt-[0.1rem]" />
					Add from VC
				</span>
			</button>

			{/* Show list of voice channels */}
			{open && (
				<>
					<VCList
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						error={error}
						data={data}
					/>
					{/* Refresh button */}
					<button
						ref={buttonRef}
						disabled={disabled}
						onClick={forceRefetch}
						className="absolute right-4 h-10 duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-30">
						<IoMdRefresh className="h-6 w-auto" />
					</button>
				</>
			)}
		</div>
	);
};

export default VCDropdown;
