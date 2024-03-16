import { useContext, useEffect, useRef } from "react";
import WheelContext from "../../contexts/WheelContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";

const ReturnToMenu = () => {
	const { returnToStart, spinning } = useContext(WheelContext);
	const confirmRef = useRef(null);
	const buttonRef = useRef(null);
	const { open, setOpen } = useClickOutside(confirmRef, buttonRef);

	useEffect(() => {
		if (spinning) setOpen(false);
	}, [spinning]);

	return (
		<div className="relative flex flex-col items-center">
			<p>Return</p>
			<button
				ref={buttonRef}
				disabled={spinning}
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center justify-center bg-darkBlack rounded-lg h-10 w-10 duration-200 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-darkBlack">
				<RiLogoutBoxLine className="h-6 w-auto drop-shadow-icon" />
			</button>
			{open && !spinning && (
				<div
					ref={confirmRef}
					className="absolute -top-[5.9rem] -right-0 text-nowrap p-5 text-lg bg-darkBlack rounded-lg drop-shadow-lg text-center">
					<h1>Return to player select?</h1>
					<div className="flex w-full justify-center gap-2 mt-1">
						<button
							onClick={returnToStart}
							className="py-1 px-3 w-full bg-green-500 hover:bg-green-600 duration-150 rounded-lg">
							<span className="drop-shadow-icon">Yes</span>
						</button>
						<button
							onClick={() => setOpen(false)}
							className="py-1 px-3 w-full bg-red-500 hover:bg-red-600 duration-150 rounded-lg">
							<span className="drop-shadow-icon">Cancel</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReturnToMenu;
