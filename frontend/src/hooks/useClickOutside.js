import { useEffect, useState } from "react";

const useClickOutside = (mainRef, itemRef) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (itemRef && itemRef.current && itemRef.current.contains(event.target)) return;
			if (mainRef && mainRef.current && !mainRef.current.contains(event.target)) setOpen(false);
		};

		if (open) document.addEventListener("click", handleClickOutside);
		else document.removeEventListener("click", handleClickOutside);

		return () => document.removeEventListener("click", handleClickOutside);
	}, [open]);

	return { open, setOpen };
};

export default useClickOutside;
