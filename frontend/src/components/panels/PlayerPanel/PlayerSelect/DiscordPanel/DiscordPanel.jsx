import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import { FaDiscord } from "react-icons/fa";
import DiscordPlayerSelect from "./DiscordPlayerSelect";
import useSessionStorage from "../../../../../hooks/useSessionStorage";
import WheelContext from "../../../../../contexts/WheelContext";
import { useQueryClient } from "react-query";
import useGetEncryptedTokens from "../../../../../api/useGetEncryptedTokens";
import useValidateToken from "../../../../../api/useValidateToken";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const DiscordPanel = () => {
	const { setItem, getItem, removeItem } = useLocalStorage();
	const { setSessionItem } = useSessionStorage();
	const { clearSessionStorage } = useSessionStorage();
	const { getEncryptedTokens } = useGetEncryptedTokens();
	const { validateToken } = useValidateToken();
	const { setPlayers } = useContext(WheelContext);
	const [sessionStatus, setSessionStatus] = useState(0); // 0 = loading, 1 = logged in, 2 = logged out
	const queryClient = useQueryClient();

	const handleLogin = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: { scopes: "guilds" },
		});
		if (error) console.error("Error: ", error?.message);
	};

	const logoutAndCleanup = () => {
		removeItem("DCWAuth", "provider_token");
		removeItem("DCWAuth", "provider_refresh_token");
		setPlayers([]);
		clearSessionStorage();
		queryClient.removeQueries();
		setSessionStatus(2);
	};

	const handleTokens = async (session) => {
		// If tokens are present in session, encrypt and save them to local storage
		if (session.provider_token && session.provider_refresh_token) {
			const encryptedTokens = await getEncryptedTokens({
				provider_token: session.provider_token,
				provider_refresh_token: session.provider_refresh_token,
			});

			if (encryptedTokens) {
				setItem("DCWAuth", "provider_token", encryptedTokens.provider_token);
				setItem("DCWAuth", "provider_refresh_token", encryptedTokens.provider_refresh_token);
			}
			setSessionStatus(1);
		}
		// If session doesn't have tokens, validate the ones in local storage
		else {
			const validation = await validateToken({
				provider_token: getItem("DCWAuth", "provider_token"),
				provider_refresh_token: getItem("DCWAuth", "provider_refresh_token"),
			});

			if (validation?.success) return setSessionStatus(1);
			// If tokens have expired, generate new encrypted ones and save them to local storage
			else if (validation?.newTokens) {
				console.log("New tokens received", validation.newTokens);
				setItem("DCWAuth", "provider_token", validation.newTokens.provider_token);
				setItem("DCWAuth", "provider_refresh_token", validation.newTokens.provider_refresh_token);
				setSessionStatus(1);
			}
			// If tokens are still invalid, log out
			else {
				console.log("Error: ", validation?.error);
				logoutAndCleanup();
			}
		}
	};

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			// User is signed in
			if (session) {
				console.log("Signed in");
				if (event === "INITIAL_SESSION")
					handleTokens(session); // Validate tokens on initial session
				else if (getItem("DCWAuth", "provider_token")) setSessionStatus(1);
				setSessionItem("DCWSession", "user", session.user?.user_metadata || {});
			}
			// No user is signed in
			else {
				console.log("No session");
				logoutAndCleanup();
			}
			// When user signs out, clear all data
			if (event === "SIGNED_OUT") {
				console.log("Signed out");
				logoutAndCleanup();
			}
		});

		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error("Error: ", error?.message);
	};

	return (
		<div className="flex flex-col gap-1 text-white z-10">
			{sessionStatus === 1 ? ( // Logged in
				<DiscordPlayerSelect handleLogout={handleLogout} />
			) : sessionStatus === 2 ? ( // Logged out, show login button
				<button
					onClick={handleLogin}
					className="group relative w-full flex items-center justify-center gap-2 p-2 2xl:p-3 bg-gradient-to-br from-highlightBlack to-darkBlack duration-200 rounded-lg 2xl:rounded-xl shadow-middle shadow-transparent hover:shadow-green-600 border-2 border-green-500 overflow-hidden">
					<div className="absolute w-full h-full bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-100 duration-300 " />
					<FaDiscord className="w-6 2xl:w-8 h-auto drop-shadow-icon" />
					<p className="drop-shadow-icon text-base 2xl:text-lg">Login to add Discord players</p>
				</button>
			) : (
				// Loading
				<div className="w-full h-12 bg-highlightBlack animate-pulse duration-200 rounded-xl" />
			)}
		</div>
	);
};

export default DiscordPanel;
