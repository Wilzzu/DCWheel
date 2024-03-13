import Wheel from "../components/wheel/Wheel";
import WheelContextProvider from "../contexts/WheelContextProvider";
import Panels from "../components/panels/Panels";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

function Root() {
	const handleLogin = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: { scopes: "guilds" },
		});
		if (error) console.error("Error: ", error.message);
		if (data) console.log(data);
	};

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session);
			if (session) {
				console.log("Signed in");
			} else console.log("Signed out");
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
		console.log("Getting guilds");
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
