import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const useGetTextChannels = (providerToken, params) => {
	const queryClient = useQueryClient();
	const { isLoading, isRefetching, isError, data, error, refetch } = useQuery(
		["textchannels"],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_SERVER_URL}/api/textchannels`, {
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
		{ staleTime: Infinity }
	);

	const removeTextChannelsCache = () => {
		queryClient.removeQueries("textchannels");
	};

	return { isLoading, isRefetching, isError, data, error, refetch, removeTextChannelsCache };
};

export default useGetTextChannels;
