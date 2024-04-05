import useLocalStorage from "../../../../../hooks/useLocalStorage";
import AddBotNotice from "./AddBotNotice";
import ErrorCard from "./ErrorCard";
import LoadingPlaceholder from "./LoadingPlaceholder";
import ServerCard from "./ServerCard";

const ServerList = ({ isLoading, isRefetching, isError, data, error }) => {
	const { getItem } = useLocalStorage();
	const favorites = getItem("DCWDiscord", "favorite_servers") || [];

	if (isRefetching) return <LoadingPlaceholder />;
	if (isLoading) return <LoadingPlaceholder />;
	if (isError) return <ErrorCard content={error?.response?.data?.error || error.message} />;
	if (!data?.guilds?.length) return <AddBotNotice />;

	// Sort servers by favorite
	data?.guilds?.sort((a, b) => {
		if (a.favorite && !b.favorite) return -1;
		if (!a.favorite && b.favorite) return 1;
		return 0;
	});

	return (
		<>
			{data?.guilds?.map((server) => (
				<li key={server.id}>
					<ServerCard server={server} favorites={favorites} />
				</li>
			))}
		</>
	);
};

export default ServerList;
