import { useContext } from "react";
import DiscordContext from "../../../../../contexts/DiscordContext";
import useGetChannels from "../../../../../api/useGetChannels";

const ServerCard = ({ server, favorites }) => {
	const { selectedServer, setSelectedServer } = useContext(DiscordContext);
	const { removeChannelsCache } = useGetChannels();

	// Select server and remove channels cache
	const selectServer = () => {
		if (selectedServer?.id === server.id) return;
		setSelectedServer(server);
		removeChannelsCache();
	};

	return (
		<button
			key={server.id}
			onClick={selectServer}
			className="flex items-center h-10 p-2 gap-2 w-full overflow-hidden hover:bg-highlightBlack rounded-md">
			<img src={server.icon} alt="" className="rounded-full h-6 w-auto" />
			<p className="w-full truncate text-left">{server.name}</p>
			{favorites.includes(server.id) ? <p>❤</p> : <p>🤍</p>}
		</button>
	);
};

export default ServerCard;
