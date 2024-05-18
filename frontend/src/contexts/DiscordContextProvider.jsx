import { useState } from "react";
import DiscordContext from "./DiscordContext";
import useSessionStorage from "../hooks/useSessionStorage";

const DiscordContextProvider = ({ children }) => {
	const { getSessionItem } = useSessionStorage();
	const [selectedServer, setSelectedServer] = useState(
		getSessionItem("DCWSession", "selected_server") || null
	);
	const [tokensValidated, setTokensValidated] = useState(false);
	const [sessionStatus, setSessionStatus] = useState(0); // 0 = loading, 1 = logged in, 2 = logged out

	return (
		<DiscordContext.Provider
			value={{
				selectedServer,
				setSelectedServer,
				tokensValidated,
				setTokensValidated,
				sessionStatus,
				setSessionStatus,
			}}>
			{children}
		</DiscordContext.Provider>
	);
};

export default DiscordContextProvider;
