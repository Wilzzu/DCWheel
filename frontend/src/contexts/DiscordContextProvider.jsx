import { useState } from "react";
import DiscordContext from "./DiscordContext";
import useSessionStorage from "../hooks/useSessionStorage";

const DiscordContextProvider = ({ children }) => {
	const { getSessionItem } = useSessionStorage();
	const [selectedServer, setSelectedServer] = useState(
		getSessionItem("DCWSession", "selected_server") || null
	);
	const [tokensValidated, setTokensValidated] = useState(false);

	return (
		<DiscordContext.Provider
			value={{
				selectedServer,
				setSelectedServer,
				tokensValidated,
				setTokensValidated,
			}}>
			{children}
		</DiscordContext.Provider>
	);
};

export default DiscordContextProvider;
