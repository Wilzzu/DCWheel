import { useEffect, useState } from "react";

const useClickAnywhere = () => {
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		if (clicked) return;
		const handleClick = () => {
			setClicked(true);
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return clicked;
};

export default useClickAnywhere;
