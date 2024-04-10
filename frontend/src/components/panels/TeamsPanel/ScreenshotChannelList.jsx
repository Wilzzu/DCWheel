import { FaHashtag } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import useGetTextChannels from "../../../api/useGetTextChannels";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { ImSpinner2 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../../lib/utils";

// If there is enough space below for the dropdown, return true
function calculateOpeningDirection(container, child) {
	if (!container?.current || !child?.current) return null;
	const containerRect = container.current.getBoundingClientRect();
	const childRect = child.current.getBoundingClientRect();
	return containerRect.bottom - childRect.bottom >= 94;
}

const ScreenshotChannelList = ({ mainRef, containerRef, selectedServer, sendScreenshot, open }) => {
	const { getItem } = useLocalStorage();
	const { isLoading, isRefetching, isError, data, refetchTextChannels } = useGetTextChannels(
		getItem("DCWAuth", "provider_token"),
		{ guildId: selectedServer.id }
	);
	const listRef = useRef(null);
	const [openBelow, setOpenBelow] = useState(true);

	// Component for the list
	const List = ({ children }) => (
		<div className={cn("absolute right-0 w-full z-10 pl-4", openBelow ? "top-16" : "bottom-16")}>
			<div className="p-1 bg-darkBlack border-2 border-highlightBlack rounded-md">
				<ul
					ref={listRef}
					className="max-h-40 pr-1 overflow-y-auto overflow-x-hidden scrollbar scrollbar-w-1 scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
					{children}
				</ul>
			</div>
		</div>
	);

	// Show only allowed channels
	// TODO: THIS IS TEMPORARY, whenever server settings are implemented, this should be updated
	const allowedChannels =
		selectedServer.id === import.meta.env.VITE_MAIN_GUILD_ID
			? data?.channels?.filter((channel) =>
					import.meta.env.VITE_ALLOWED_CHANNELS.includes(channel.id)
			  )
			: data?.channels;

	// Refetch when user opens the dropdown and the data is stale
	// Also calculate which direction to open the dropdown
	useEffect(() => {
		if (!open) return;
		if (openBelow) setOpenBelow(calculateOpeningDirection(mainRef, listRef));
		refetchTextChannels(); // Use this to refetch, since making the data stale would reset scroll position
	}, [open]);

	if (!open) return;

	// Loading state
	if (isLoading || isRefetching)
		return (
			<List>
				<li className="flex items-center h-10 p-2 gap-2 w-full">
					<ImSpinner2 className="animate-spin h-5 w-5" />
					Loading...
				</li>
			</List>
		);

	// Error state
	if (isError) {
		return (
			<List>
				<li className="flex items-center h-10 p-2 gap-1 w-full">
					<BiError className="text-red-500 h-5 w-5" />
					<p>Error</p>
				</li>
			</List>
		);
	}

	return (
		<List>
			{allowedChannels?.map((channel) => (
				<li key={channel.id}>
					<button
						className="group w-full flex items-center font-light gap-2 px-2 py-4 text-white bg-darkBlack rounded-md hover:bg-highlightBlack duration-150"
						onClick={() => sendScreenshot(containerRef, channel.id)}>
						{/* Icon */}
						<span className="w-5 h-5 overflow-hidden flex items-center mt-[1px]">
							<FaHashtag className="w-4 h-4 block group-hover:hidden" />
							<RiMailSendLine className="w-4 h-4 hidden group-hover:block" />
						</span>
						{/* Channel name */}
						<p title={channel.name} className="w-full truncate text-left">
							{channel.name}
						</p>
					</button>
				</li>
			))}
		</List>
	);
};

export default ScreenshotChannelList;
