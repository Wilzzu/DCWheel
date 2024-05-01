import axios from "axios";

const useValidateToken = () => {
	const validateToken = async (params) => {
		return axios
			.get(`${import.meta.env.VITE_SERVER_URL}/api/validate`, { params })
			.then((res) => res.data)
			.catch((err) => {
				console.error(err);
			});
	};
	return { validateToken };
};

export default useValidateToken;
