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
	const { isLoading, isError, isStale, data, refetch } = useGetTextChannels(
		getItem("DCWAuth", "provider_token"),
		{ guildId: selectedServer.id }
	);
	const listRef = useRef(null);
	const [openBelow, setOpenBelow] = useState(true);

	// Component for the list
	const List = ({ children }) => (
		<ul
			ref={listRef}
			className={cn(
				"absolute right-0 w-full z-10 p-1 max-h-40 overflow-y-auto overflow-x-hidden bg-darkBlack border-2 border-highlightBlack rounded-md scrollbar-thin scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
				openBelow ? "top-16" : "bottom-16"
			)}>
			{children}
		</ul>
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
		if (isStale) refetch();
	}, [open]);

	if (!open) return;

	// Loading state
	if (isLoading)
		return (
			<List>
				<div className="flex items-center h-10 p-2 gap-2 w-full">
					<ImSpinner2 className="animate-spin h-5 w-5" />
					Loading...
				</div>
			</List>
		);

	// Error state
	if (isError) {
		return (
			<List>
				<div className="flex items-center h-10 p-2 gap-1 w-full">
					<BiError className="text-red-500 h-5 w-5" />
					<p>Error</p>
				</div>
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
