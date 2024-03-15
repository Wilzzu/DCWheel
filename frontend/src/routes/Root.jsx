import Wheel from "../components/wheel/Wheel";
import WheelContextProvider from "../contexts/WheelContextProvider";
import Panels from "../components/panels/Panels";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useGetGuilds from "../api/useGetGuilds";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

function Root() {
	const { setItem, getItem, removeItem } = useLocalStorage();

	// React query
	// This doesn't work right here, because it is always rendered, but
	// it should work in a component that is only rendered when the user is logged in
	const { isSuccess, isLoading, isError, data, error, refetchGuilds } = useGetGuilds(
		getItem("DCWAuth", "provider_token")
	);

	if (isLoading) console.log("Loading..."); //return <div>Loading...</div>;
	if (isError) console.error("Error: ", error.message); //return <div>Error: {error.message}</div>;
	if (isSuccess) console.log(data); //return <div>{data}</div>;

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
				console.log("Signed in");
			}
			// No user is signed in
			else {
				console.log("No session");
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
					<button onClick={refetchGuilds} className="text-white h-10">
						Get guilds
					</button>
				</div>
				<Panels />
			</WheelContextProvider>
		</main>
	);
}

export default Root;
