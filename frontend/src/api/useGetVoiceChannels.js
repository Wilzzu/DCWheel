import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const useGetVoiceChannels = (providerToken, params) => {
	const queryClient = useQueryClient();
	const { isLoading, isRefetching, isError, isStale, data, error, refetch } = useQuery(
		["voicechannels"],
		async () => {
			return axios
				.get(`${import.meta.env.VITE_SERVER_URL}/api/voicechannels`, {
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
		{ staleTime: 5000, enabled: false }
	);

	const removeVoiceChannelsCache = () => {
		queryClient.removeQueries("voicechannels");
	};

	return {
		isLoading,
		isRefetching,
		isError,
		isStale,
		data,
		error,
		refetch,
		removeVoiceChannelsCache,
	};
};

export default useGetVoiceChannels;
