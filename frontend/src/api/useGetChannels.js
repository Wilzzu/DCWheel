import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const useGetChannels = (providerToken, params) => {
	const queryClient = useQueryClient();
	const { isLoading, isRefetching, isError, isStale, data, error, refetch } = useQuery(
		["channels"],
		async () => {
			return axios
				.get("/api/channels", {
					params,
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
		{ staleTime: 5000 * 100000, enabled: false } // TODO: remove 100000 when testing is done
	);

	const removeChannelsCache = () => {
		queryClient.removeQueries("channels");
	};

	return { isLoading, isRefetching, isError, isStale, data, error, refetch, removeChannelsCache };
};

export default useGetChannels;
