import axios from "axios";

const useGetEncryptedTokens = () => {
	const getEncryptedTokens = async (params) => {
		return axios
			.get(`${import.meta.env.VITE_SERVER_URL}/api/encrypt`, { params })
			.then((res) => res.data)
			.catch((err) => {
				console.error(err);
			});
	};
	return { getEncryptedTokens };
};

export default useGetEncryptedTokens;
