import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import { FaDiscord } from "react-icons/fa";
import DiscordPlayerSelect from "./DiscordPlayerSelect";
import DiscordContextProvider from "../../../../../contexts/DiscordContextProvider";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const DiscordPanel = () => {
	const { setItem, removeItem } = useLocalStorage();
	const [sessionStatus, setSessionStatus] = useState(0); // 0 = loading, 1 = logged in, 2 = logged out

	const handleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: { scopes: "guilds" },
		});
		if (error) console.error("Error: ", error.message);
	};

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session);

			// User is signed in
			if (session) {
				if (session.provider_token) setItem("DCWAuth", "provider_token", session.provider_token); // Save token to local storage
				setSessionStatus(1);
				console.log("Signed in");
			}
			// No user is signed in
			else {
				console.log("No session");
				setSessionStatus(2);
			}

			if (event === "SIGNED_OUT") {
				console.log("Signed out");
				removeItem("DCWAuth", "provider_token");
				setSessionStatus(2);
			}
		});

		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error("Error: ", error.message);
	};

	return (
		<div className="flex flex-col gap-1 text-white">
			{sessionStatus === 1 ? ( // Logged in
				<DiscordContextProvider>
					<DiscordPlayerSelect handleLogout={handleLogout} />
				</DiscordContextProvider>
			) : sessionStatus === 2 ? ( // Logged out
				<button
					onClick={handleLogin}
					className="group w-full flex items-center justify-center gap-2 p-3 bg-highlightBlack hover:bg-green-700 duration-200 rounded-xl shadow-middle shadow-transparent hover:shadow-green-700 border-2 border-green-500">
					<FaDiscord className="w-8 h-auto drop-shadow-icon" />
					<p className="drop-shadow-icon text-lg">Login to add Discord players</p>
				</button>
			) : (
				// Loading
				<p className="text-white h-10">Loading...</p>
			)}
		</div>
	);
};

export default DiscordPanel;