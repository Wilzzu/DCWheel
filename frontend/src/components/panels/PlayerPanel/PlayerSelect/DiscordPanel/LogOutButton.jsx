import { useContext, useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import useClickOutside from "../../../../../hooks/useClickOutside";
import DiscordContext from "../../../../../contexts/DiscordContext";

const LogOutButton = ({ handleLogout }) => {
	const confirmRef = useRef(null);
	const buttonRef = useRef(null);
	const { open, setOpen } = useClickOutside(confirmRef, buttonRef);
	const { selectedServer } = useContext(DiscordContext);

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				onClick={() => setOpen((prev) => !prev)}
				className="flex items-center justify-center gap-2 h-full bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack text-sm rounded-lg text-nowrap px-3">
				<FiLogOut className="h-6 w-auto" />
				{!selectedServer && <p>Log out</p>}
			</button>
			{open && (
				<div
					ref={confirmRef}
					className="absolute top-[3.25rem] right-0 p-2 bg-darkBlack rounded-md border-2 border-highlightBlack z-10 drop-shadow-button text-center">
					<h1>Log out?</h1>
					<div className="flex w-full justify-center gap-2 mt-1">
						<button
							onClick={handleLogout}
							className="p-1 w-20 border-2 border-green-500 bg-green-600 hover:bg-green-500 duration-150 rounded drop-shadow-button">
							<span className="drop-shadow-icon">Yes</span>
						</button>
						<button
							onClick={() => setOpen(false)}
							className="p-1 w-20 border-2 border-red-500 bg-red-600 hover:bg-red-500 duration-150 rounded drop-shadow-button">
							<span className="drop-shadow-icon">Cancel</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default LogOutButton;
