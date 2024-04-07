import { useLayoutEffect, useState } from "react";

// Original source: https://stackoverflow.com/a/19014495/13544771
const useWindowSize = () => {
	const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
	useLayoutEffect(() => {
		function updateSize() {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
};

export default useWindowSize;
