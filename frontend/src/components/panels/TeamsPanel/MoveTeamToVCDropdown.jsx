import { motion } from "framer-motion";
import useMoveTeamToVC from "../../../api/useMoveTeamToVC";
import useGetVoiceChannels from "../../../api/useGetVoiceChannels";
import { useContext, useEffect, useRef, useState } from "react";
import DiscordContext from "../../../contexts/DiscordContext";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { RxSpeakerLoud } from "react-icons/rx";
import { BiError } from "react-icons/bi";
import useClickOutside from "../../../hooks/useClickOutside";
import { ImSpinner2 } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";

// TODO: This and ScreenshotButton could be made into one component
const MoveTeamToVCDropdown = ({ team, teamNumber }) => {
	const { selectedServer } = useContext(DiscordContext);
	const { getItem } = useLocalStorage();
	const buttonRef = useRef(null);
	const [disabled, setDisabled] = useState(false);
	const { open, setOpen } = useClickOutside(buttonRef);

	const {
		moveTeamToVC,
		isLoading: moveIsLoading,
		error: moveError,
		isSuccess,
		reset,
	} = useMoveTeamToVC();
	const { isLoading, isRefetching, isError, data, error, refetch } = useGetVoiceChannels(
		getItem("DCWAuth", "provider_token"),
		{ guildId: selectedServer.id, allChannels: true }
	);

	// Show only allowed channels
	// TODO: THIS IS TEMPORARY, whenever server settings are implemented, this should be updated
	const allowedChannels =
		selectedServer.id === import.meta.env.VITE_MAIN_GUILD_ID
			? data?.channels?.filter(
					(channel) => import.meta.env.VITE_ALLOWED_VOICE_CHANNELS.includes(channel.id)
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  )
			: data?.channels;

	const execute = (channelId) => {
		const playerIds = team.map((e) => e.id);
		moveTeamToVC(playerIds, teamNumber, channelId);
		setDisabled(true);
	};

	// Fetch voice channels instantly
	useEffect(() => {
		refetch();
	}, []);

	useEffect(() => {
		if (moveError) setDisabled(false);
	}, [moveError]);

	useEffect(() => {
		reset();
		setDisabled(false);
	}, [team]);

	return (
		<motion.div
			initial={{ y: -3, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
			className="relative w-fit flex justify-center moveTeamToVCButton">
			<button
				ref={buttonRef}
				disabled={disabled}
				className="p-2 rounded-md border-2 border-green-400 bg-gradient-to-br from-green-700 to-green-500 hover:from-green-600 hover:to-green-500 disabled:cursor-default disabled:hover:from-green-700 disabled:hover:to-green-500 duration-300"
				onClick={() => setOpen((prev) => !prev)}>
				<p className="drop-shadow-text flex gap-[6px] items-center text-sm select-none">
					{moveError ? (
						<>
							<BiError className="shrink-0" /> Error: {moveError?.message || "Unknown"}
						</>
					) : moveIsLoading ? (
						<>
							<ImSpinner2 className="animate-spin h-5 w-5" />
							Moving team...
						</>
					) : isSuccess ? (
						<>
							<FaCheck /> Team moved to VC!
						</>
					) : (
						<>
							<RxSpeakerLoud strokeWidth={0.6} /> Move Team {teamNumber} to VC
						</>
					)}
				</p>
			</button>
			{open && (
				<div className="absolute top-11 w-full p-1 border-2 border-green-600 bg-green-900 rounded-md z-10">
					<ul className="w-full max-h-40 overflow-y-auto overflow-x-hidden scrollbar scrollbar-w-1 scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent">
						{isError ? (
							<p className="text-center">Error: {error || "Unknown"}</p>
						) : isLoading || isRefetching ? (
							<p className="flex gap-2 p-1">
								<ImSpinner2 className="animate-spin h-5 w-5" /> Loading...
							</p>
						) : (
							allowedChannels.map((channel) => {
								return (
									<li key={channel.id}>
										<button
											onClick={() => execute(channel.id)}
											className="flex gap-2 items-center hover:bg-green-700 w-full p-2 pr-0 text-sm rounded-md overflow-hidden">
											<RxSpeakerLoud strokeWidth={0.5} className="shrink-0" />
											<p className="w-full truncate text-left">{channel.name}</p>
										</button>
									</li>
								);
							})
						)}
					</ul>
				</div>
			)}
		</motion.div>
	);
};

export default MoveTeamToVCDropdown;
