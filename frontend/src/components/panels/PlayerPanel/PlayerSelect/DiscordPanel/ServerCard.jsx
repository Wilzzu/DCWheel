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
			className="flex items-center h-10 p-2 gap-2 w-full overflow-hidden hover:bg-highlightBlack rounded-md">
			<img
				src={server.icon}
				alt={server.name + " icon"}
				className="rounded-full h-6 w-auto aspect-square"
				loading="lazy"
				onLoad={() => setIsLoaded(true)}
			/>
			{!isLoaded && (
				<div className="absolute h-6 w-6 aspect-square bg-neutral-700 rounded-full animate-pulse" />
			)}
			<p className="w-full truncate text-left">{server.name}</p>
			{/* {favorites.includes(server.id) ? <p>❤</p> : <p>🤍</p>} */}
		</button>
	);
};

export default ServerCard;
