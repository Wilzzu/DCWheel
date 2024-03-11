import axios from "axios";
import { useState } from "react";

const useCustomPlayerImage = () => {
	const [data, setData] = useState(null);

	// Work of Taylor Hunt @ https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
	const encodeSvg = (svgString) => {
		return svgString
			.replace(
				"<svg",
				~svgString.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"'
			)
			.replace(/"/g, "'")
			.replace(/%/g, "%25")
			.replace(/#/g, "%23")
			.replace(/{/g, "%7B")
			.replace(/}/g, "%7D")
			.replace(/</g, "%3C")
			.replace(/>/g, "%3E")
			.replace(/\s+/g, " ");
	};

	const fetchData = async () => {
		await axios
			.get(`http://localhost:3000/api/customimage`)
			.then((img) => {
				setData("data:image/svg+xml," + encodeSvg(img.data));
			})
			.catch((err) => {
				console.log(err);
				setData(
					"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg"
				);
			});
	};

	const refetch = () => {
		fetchData();
	};

	return { data, refetch };
};

export default useCustomPlayerImage;
