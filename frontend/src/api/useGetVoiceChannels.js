import axios from "axios";
import { useQuery } from "react-query";

const useGetVoiceChannels = (providerToken, params) => {
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

	return {
		isLoading,
		isRefetching,
		isError,
		isStale,
		data,
		error,
		refetch,
	};
};

export default useGetVoiceChannels;
