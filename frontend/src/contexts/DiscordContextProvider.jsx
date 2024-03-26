import { useState } from "react";
import DiscordContext from "./DiscordContext";
import useSessionStorage from "../hooks/useSessionStorage";

const DiscordContextProvider = ({ children }) => {
	const { getSessionItem } = useSessionStorage();
	const [selectedServer, setSelectedServer] = useState(
		getSessionItem("DCWSession", "selected_server") || null
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
