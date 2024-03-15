import useLocalStorage from "../../../../../hooks/useLocalStorage";
import ServerCard from "./ServerCard";

const ServerList = ({ isLoading, isRefetching, isError, data, error }) => {
	const { getItem } = useLocalStorage();
	const favorites = getItem("DCWDiscord", "favorite_servers") || [];

	if (isRefetching) console.log("Refetching..."); //return <div>Refetching...</div>;
	if (isLoading) console.log("Loading..."); //return <div>Loading...</div>;
	if (isError) console.error("Error: ", error.message); //return <div>Error: {error.message}</div>;
	if (data) console.log(data); //return <div>{data}</div>;

	// Sort servers by favorite
	data?.guilds?.sort((a, b) => {
		if (a.favorite && !b.favorite) return -1;
		if (!a.favorite && b.favorite) return 1;
		return 0;
	});

	return (
		<ul className="absolute top-[3.1rem] max-h-56 w-full p-1 overflow-y-auto bg-darkBlack rounded-md outline outline-2 outline-highlightBlack z-10">
			{data?.guilds?.map((server) => (
				<li key={server.id}>
					<ServerCard server={server} favorites={favorites} />
				</li>
			))}
		</ul>
	);
};

export default ServerList;
