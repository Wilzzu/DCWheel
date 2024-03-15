import { useState } from "react";
import DiscordContext from "./DiscordContext";
import useLocalStorage from "../hooks/useLocalStorage";

const DiscordContextProvider = ({ children }) => {
	const { getItem } = useLocalStorage();
	const [selectedServer, setSelectedServer] = useState(
		getItem("DCWDiscord", "selected_server") || null
	);

	return (
		<DiscordContext.Provider
			value={{
				selectedServer,
				setSelectedServer,
			}}>
			{children}
		</DiscordContext.Provider>
	);
};

export default DiscordContextProvider;
