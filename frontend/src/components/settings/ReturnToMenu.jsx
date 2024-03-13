import { useContext, useEffect, useRef } from "react";
import WheelContext from "../../contexts/WheelContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";

const ReturnToMenu = () => {
	const { returnToStart, spinning } = useContext(WheelContext);
	const confirmRef = useRef(null);
	const buttonRef = useRef(null);
	const { confirm, setConfirm } = useClickOutside(confirmRef, buttonRef);

	useEffect(() => {
		if (spinning) setConfirm(false);
	}, [spinning]);

	return (
		<div className="relative flex flex-col items-center">
			<p>Return</p>
			<button
				ref={buttonRef}
				disabled={spinning}
				onClick={() => setConfirm((prev) => !prev)}
				className="flex items-center justify-center bg-darkBlack rounded-lg h-10 w-10 duration-200 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-darkBlack">
				<RiLogoutBoxLine className="h-6 w-auto drop-shadow-icon" />
			</button>
			{confirm && !spinning && (
				<div
					ref={confirmRef}
					className="absolute -top-[5.2rem] -right-1 text-nowrap p-4 text-lg bg-darkBlack rounded-lg drop-shadow-lg text-center">
					<h1>Return to start?</h1>
					<div className="flex w-full justify-center gap-2 mt-1">
						<button
							onClick={returnToStart}
							className="py-1 px-3 bg-green-500 hover:bg-green-600 duration-150 rounded-lg">
							<span className="drop-shadow-icon">Yes</span>
						</button>
						<button
							onClick={() => setConfirm(false)}
							className="py-1 px-3 bg-red-500 hover:bg-red-600 duration-150 rounded-lg">
							<span className="drop-shadow-icon">Cancel</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReturnToMenu;
