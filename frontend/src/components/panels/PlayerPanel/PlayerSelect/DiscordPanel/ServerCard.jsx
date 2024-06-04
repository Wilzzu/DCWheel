import { useContext, useState } from "react";
import DiscordContext from "../../../../../contexts/DiscordContext";
import useSessionStorage from "../../../../../hooks/useSessionStorage";
import { useQueryClient } from "react-query";

const ServerCard = ({ server, favorites }) => {
	const { selectedServer, setSelectedServer } = useContext(DiscordContext);
	const [isLoaded, setIsLoaded] = useState(false);
	const { setSessionItem } = useSessionStorage();
	const queryClient = useQueryClient();

	// Select server and remove channels cache
	const selectServer = () => {
		if (selectedServer?.id === server.id) return;
		setSelectedServer(server);
		setSessionItem("DCWSession", "selected_server", server);

		// Remove query cache
		queryClient.removeQueries({ queryKey: ["textchannels"] });
		queryClient.removeQueries({ queryKey: ["voicechannels"] });
		queryClient.removeQueries({ queryKey: ["allMembers"] });
	};

	return (
		<button
			key={server.id}
			onClick={selectServer}
			className="flex items-center h-8 2xl:h-10 p-2 gap-2 w-full overflow-hidden hover:bg-highlightBlack rounded 2xl:rounded-md">
			{server.icon ? (
				<>
					<img
						src={server.icon}
						alt={server.name + " icon"}
						className="rounded-full h-5 2xl:h-6 w-auto aspect-square flex-shrink-0"
						loading="lazy"
						onLoad={() => setIsLoaded(true)}
					/>
					{!isLoaded && (
						<div className="absolute h-5 2xl:h-6 w-5 2xl:w-6 aspect-square bg-neutral-700 rounded-full animate-pulse flex-shrink-0" />
					)}
				</>
			) : (
				// Server icon placeholder
				<div className="flex items-center justify-center h-5 2xl:h-6 w-5 2xl:w-6 aspect-square bg-[#5865F2] rounded-full flex-shrink-0">
					<p className="text-neutral-100 text-center text-xs 2xl:text-sm">
						{server.name[0].toUpperCase()}
					</p>
				</div>
			)}
			<p className="w-full truncate text-left">{server.name}</p>
			{/* {favorites.includes(server.id) ? <p>❤</p> : <p>🤍</p>} */}
		</button>
	);
};

export default ServerCard;
