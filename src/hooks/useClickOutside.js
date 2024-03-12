import { useEffect, useState } from "react";

const useClickOutside = (confirmRef, buttonRef) => {
	const [confirm, setConfirm] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (buttonRef && buttonRef.current && buttonRef.current.contains(event.target)) return;
			if (confirmRef && confirmRef.current && !confirmRef.current.contains(event.target)) {
				setConfirm(false);
			}
		};

		if (confirm) document.addEventListener("click", handleClickOutside);
		else document.removeEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
	}, [confirm]);

	return { confirm, setConfirm };
};

export default useClickOutside;
