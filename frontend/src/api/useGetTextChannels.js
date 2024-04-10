import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const useGetTextChannels = (providerToken, params) => {
	const [lastFetch, setLastFetch] = useState(null);
	const { isLoading, isRefetching, isError, data, refetch } = useQuery(
		["textchannels"],
		async () => {
			setLastFetch(Date.now());
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
		{ staleTime: Infinity, refetchOnWindowFocus: false }
	);

	// Refetch when enough time has passed since the last fetch
	const refetchTextChannels = () => {
		if (lastFetch !== null && Date.now() - lastFetch > 10000) {
			refetch();
			setLastFetch(Date.now());
		}
	};

	return { isLoading, isRefetching, isError, data, refetchTextChannels };
};

export default useGetTextChannels;
