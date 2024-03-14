import Wheel from "../components/wheel/Wheel";
import WheelContextProvider from "../contexts/WheelContextProvider";
import Panels from "../components/panels/Panels";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

function Root() {
	const { setItem, getItem, removeItem } = useLocalStorage();
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

			if (session) {
				if (session.provider_token) setItem("DCWAuth", "provider_token", session.provider_token); // Save token to local storage
				console.log("Signed in");
			}

			if (event === "SIGNED_OUT") {
				console.log("Signed out");
				removeItem("DCWAuth", "provider_token");
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

	const getGuilds = async () => {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();
		if (error) console.error("Error getting session: ", error.message);
		console.log(session);

		// Get provider token from local storage
		const providerToken = getItem("DCWAuth", "provider_token");
		if (!providerToken) return console.error("No provider token");
		console.log(providerToken);

		// Fetch guilds with axios, this will be replaced with a react query
		axios
			.get("http://localhost:3000/api/guilds", {
				headers: {
					Authorization: `Bearer ${providerToken}`,
				},
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.error(err));
	};

	return (
		<main className="h-[100dvh] flex p-5 gap-28 justify-center font-outfit">
			<WheelContextProvider>
				<Wheel />
				<div>
					<button onClick={handleLogin} className="text-white h-10">
						Login
					</button>
					<button onClick={handleLogout} className="text-white h-10">
						Logout
					</button>
					<button onClick={getGuilds} className="text-white h-10">
						Get guilds
					</button>
				</div>
				<Panels />
			</WheelContextProvider>
		</main>
	);
}

export default Root;
