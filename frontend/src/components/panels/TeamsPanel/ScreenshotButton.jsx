import { useContext, useEffect, useRef } from "react";
import useSendScreenshot from "../../../api/useSendScreenshot";
import { PiImagesSquare } from "react-icons/pi";
import { cn } from "../../../../lib/utils";
import useGetTextChannels from "../../../api/useGetTextChannels";
import useLocalStorage from "../../../hooks/useLocalStorage";
import DiscordContext from "../../../contexts/DiscordContext";
import { FaHashtag } from "react-icons/fa6";
import { RiMailSendLine } from "react-icons/ri";
import useClickOutside from "../../../hooks/useClickOutside";

const ScreenshotButton = ({ containerRef, setShow }) => {
	const { getItem } = useLocalStorage();
	const { selectedServer } = useContext(DiscordContext);
	const buttonRef = useRef(null);
	const {
		isLoading: textIsLoading,
		isRefetching,
		isError,
		data,
		error: textIsError,
		refetch,
	} = useGetTextChannels(getItem("DCWAuth", "provider_token"), { guildId: selectedServer.id });
	const { sendScreenshot, isLoading, error, isSuccess, reset } = useSendScreenshot();
	const { open, setOpen } = useClickOutside(buttonRef);

	// Hide the button after the screenshot has been sent with a delay
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => setShow(false), 2500);
		}
	}, [isSuccess]);

	// Reset after error
	useEffect(() => {
		if (error) setTimeout(() => reset(), 4500);
	}, [error]);

	// Reset when unmounted, so we can make call again later if needed
	useEffect(() => {
		return () => reset();
	}, []);

	// Show only allowed channels
	// TODO: THIS IS TEMPORARY, whenever server settings are implemented, this should be updated
	const allowedChannels =
		selectedServer.id === import.meta.env.VITE_MAIN_GUILD_ID
			? data?.channels?.filter((channel) =>
					import.meta.env.VITE_ALLOWED_CHANNELS.includes(channel.id)
			  )
			: data?.channels;

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				disabled={isLoading || isSuccess || error}
				className={cn(
					"flex items-center justify-center min-w-48 gap-2 p-4 text-white bg-darkBlack border-2 border-highlightBlack rounded-md hover:bg-highlightBlack duration-150 disabled:hover:bg-normalBlack disabled:cursor-default disabled:opacity-70",
					isSuccess &&
						"disabled:opacity-100 disabled:hover:bg-green-900 bg-green-900 border-green-500 duration-300"
				)}
				onClick={() => setOpen((prev) => !prev)}>
				<PiImagesSquare className="w-6 h-6" />
				{isLoading
					? "Sending..."
					: error
					? "Error"
					: isSuccess
					? "Screenshot sent!"
					: "Send Screenshot"}
			</button>
			{/* Channel list */}
			{open && (
				<ul className="absolute top-16 right-0 w-full z-10 p-1 max-h-40 overflow-y-auto overflow-x-hidden bg-darkBlack border-2 border-highlightBlack rounded-md scrollbar-thin scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
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
				</ul>
			)}
		</div>
	);
};

export default ScreenshotButton;
