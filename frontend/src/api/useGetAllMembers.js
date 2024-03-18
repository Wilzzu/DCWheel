import axios from "axios";
import { useQuery } from "react-query";

const useGetAllMembers = (providerToken, params) => {
	const { isLoading, isRefetching, isError, data, error, refetch } = useQuery(
		["allMembers"],
		async () => {
			return axios
				.get("http://localhost:3000/api/members", {
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

	return { isLoading, isRefetching, isError, data, error, refetch };
};

export default useGetAllMembers;
