import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import { FaDiscord } from "react-icons/fa";
import DiscordPlayerSelect from "./DiscordPlayerSelect";
import useSessionStorage from "../../../../../hooks/useSessionStorage";
import WheelContext from "../../../../../contexts/WheelContext";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const DiscordPanel = () => {
	const { setItem, removeItem } = useLocalStorage();
	const { setSessionItem } = useSessionStorage();
	const { clearSessionStorage } = useSessionStorage();
	const { setPlayers } = useContext(WheelContext);
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
			// console.log(event, session);

			// User is signed in
			if (session) {
				if (session.provider_token) setItem("DCWAuth", "provider_token", session.provider_token); // Save token to local storage
				setSessionStatus(1);
				setSessionItem("DCWSession", "user", session.user?.user_metadata || {});
				console.log("Signed in");
			}
			// No user is signed in
			else {
				console.log("No session");
				setSessionStatus(2);
			}
			// When user signs out, clear all data
			if (event === "SIGNED_OUT") {
				console.log("Signed out");
				removeItem("DCWAuth", "provider_token");
				setPlayers([]);
				clearSessionStorage();
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
		<div className="flex flex-col gap-1 text-white z-10">
			{sessionStatus === 1 ? ( // Logged in
				<DiscordPlayerSelect handleLogout={handleLogout} />
			) : sessionStatus === 2 ? ( // Logged out
				<button
					onClick={handleLogin}
					className="group w-full flex items-center justify-center gap-2 p-3 bg-highlightBlack hover:bg-green-600 duration-200 rounded-xl shadow-middle shadow-transparent hover:shadow-green-600 border-2 border-green-500">
					<FaDiscord className="w-8 h-auto drop-shadow-icon" />
					<p className="drop-shadow-icon text-lg">Login to add Discord players</p>
				</button>
			) : (
				// Loading
				<div className="w-full h-12 bg-highlightBlack animate-pulse duration-200 rounded-xl" />
			)}
		</div>
	);
};

export default DiscordPanel;
