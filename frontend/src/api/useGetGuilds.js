import axios from "axios";
import { useQuery } from "react-query";

const useGetGuilds = (providerToken) => {
	const { isSuccess, isLoading, isError, data, error, refetch } = useQuery(
		["guilds"],
		async () => {
			return axios
				.get("http://localhost:3000/api/guilds", {
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
		{ enabled: false }
	);

	// Refetch only if there is no data already
	const refetchGuilds = () => {
		if (!data) refetch();
	};

	return { isSuccess, isLoading, isError, data, error, refetchGuilds };
};

export default useGetGuilds;
