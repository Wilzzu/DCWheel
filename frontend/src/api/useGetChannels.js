import axios from "axios";
import { useQuery } from "react-query";

const useGetChannels = (providerToken, params) => {
	const { isLoading, isRefetching, isError, isStale, data, error, refetch } = useQuery(
		["channels"],
		async () => {
			return axios
				.get("http://localhost:3000/api/channels", {
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

	return { isLoading, isRefetching, isError, isStale, data, error, refetch };
};

export default useGetChannels;
