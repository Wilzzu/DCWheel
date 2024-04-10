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
				className="flex items-center justify-center bg-darkBlack rounded-md 2xl:rounded-lg h-8 2xl:h-10 w-8 2xl:w-10 duration-200 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-darkBlack drop-shadow-icon">
				<RiLogoutBoxLine className="h-5 2xl:h-6 w-auto drop-shadow-icon" />
			</button>
			{open && !spinning && (
				<div
					ref={confirmRef}
					className="absolute -top-14 2xl:-top-[5.2rem] -right-0 text-nowrap p-2 2xl:p-3 text-xs 2xl:text-base bg-darkBlack rounded-md border-2 border-highlightBlack drop-shadow-button text-center">
					<h1>Return to player select?</h1>
					<div className="flex w-full justify-center gap-2 mt-1 text-sm 2xl:text-lg">
						<button
							onClick={returnToStart}
							className="p-1 w-16 2xl:w-20 border-2 border-green-500 bg-green-600 hover:bg-green-500 duration-150 rounded drop-shadow-button">
							<span className="drop-shadow-icon">Yes</span>
						</button>
						<button
							onClick={() => setOpen(false)}
							className="p-1 w-16 2xl:w-20 border-2 border-red-500 bg-red-600 hover:bg-red-500 duration-150 rounded drop-shadow-button">
							<span className="drop-shadow-icon">Cancel</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReturnToMenu;
