import useLocalStorage from "../../../../../hooks/useLocalStorage";
import ErrorCard from "./ErrorCard";
import LoadingPlaceholder from "./LoadingPlaceholder";
import ServerCard from "./ServerCard";

const List = ({ children }) => (
	<ul className="max-h-[30rem] relative overflow-y-auto scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-w-2">
		{children}
	</ul>
);

const ServerList = ({ isLoading, isRefetching, isError, data, error }) => {
	const { getItem } = useLocalStorage();
	const favorites = getItem("DCWDiscord", "favorite_servers") || [];

	if (isLoading || isRefetching)
		return (
			<List>
				<LoadingPlaceholder />
			</List>
		);
	if (isError)
		return (
			<List>
				<ErrorCard content={error?.response?.data?.error || error?.message} />
			</List>
		);

	// Sort servers by favorite
	data?.guilds?.sort((a, b) => {
		if (a.favorite && !b.favorite) return -1;
		if (!a.favorite && b.favorite) return 1;
		return 0;
	});

	return (
		<List>
			{data?.guilds?.map((server) => (
				<li key={server.id}>
					<ServerCard server={server} favorites={favorites} />
				</li>
			))}
		</List>
	);
};

export default ServerList;
