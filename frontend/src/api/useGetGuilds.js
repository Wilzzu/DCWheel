import axios from "axios";
import { useQuery } from "react-query";

const useGetGuilds = (providerToken) => {
	const { isLoading, isRefetching, isError, data, error, refetch } = useQuery(
		["guilds"],
		async () => {
			return axios
				.get("/api/guilds", {
					headers: {
						Authorization: `Bearer ${providerToken}`,
					},
				})
				.then((res) => res.data)
				.catch((err) => {
					console.error(err);
					throw err;
				});
		},
		{ staleTime: Infinity }
	);

	return { isLoading, isRefetching, isError, data, error, refetch };
};

export default useGetGuilds;
