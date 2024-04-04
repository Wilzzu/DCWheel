import axios from "axios";
import { useQuery } from "react-query";

const useGetTextChannels = (providerToken, params) => {
	const { isLoading, isError, data, isStale, refetch } = useQuery(
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
		{ staleTime: 5000, refetchOnWindowFocus: false }
	);

	return { isLoading, isError, isStale, data, refetch };
};

export default useGetTextChannels;
