import { useContext } from "react";
import DiscordContext from "../../../../../contexts/DiscordContext";

const ServerCard = ({ server, favorites }) => {
	const { setSelectedServer } = useContext(DiscordContext);

	return (
		<button
			key={server.id}
			onClick={() => setSelectedServer(server)}
			className="flex items-center h-10 p-2 gap-2 w-full overflow-hidden hover:bg-highlightBlack rounded-md">
			<img src={server.icon} alt="" className="rounded-full h-6 w-auto" />
			<p className="w-full truncate text-left">{server.name}</p>
			{favorites.includes(server.id) ? <p>❤</p> : <p>🤍</p>}
		</button>
	);
};

export default ServerCard;
