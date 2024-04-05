import { useEffect, useRef } from "react";
import useSendScreenshot from "../../../api/useSendScreenshot";
import { PiImagesSquare } from "react-icons/pi";
import { cn } from "../../../../lib/utils";
import useClickOutside from "../../../hooks/useClickOutside";
import ScreenshotChannelList from "./ScreenshotChannelList";

const ScreenshotButton = ({ containerRef, setShow, selectedServer }) => {
	const buttonRef = useRef(null);
	const { sendScreenshot, isLoading, error, isSuccess, reset } = useSendScreenshot();
	const { open, setOpen } = useClickOutside(buttonRef);

	// Hide the button after the screenshot has been sent with a delay
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => setShow(false), 2500);
		}
	}, [isSuccess]);

	// Reset button after error
	useEffect(() => {
		if (error) setTimeout(() => reset(), 4500);
	}, [error]);

	// Reset when unmounted, so we can make call again later if needed
	useEffect(() => {
		return () => reset();
	}, []);

	return (
		<div className="relative">
			<button
				ref={buttonRef}
				disabled={isLoading || isSuccess || error}
				className={cn(
					"flex items-center justify-center min-w-48 gap-2 p-4 text-white bg-darkBlack border-2 border-highlightBlack rounded-md hover:bg-highlightBlack duration-150 disabled:hover:bg-normalBlack disabled:cursor-default disabled:opacity-70",
					isSuccess &&
						"disabled:opacity-100 disabled:hover:bg-green-900 bg-green-900 border-green-500 duration-300"
				)}
				onClick={() => setOpen((prev) => !prev)}>
				<PiImagesSquare className="w-6 h-6" />
				{isLoading
					? "Sending..."
					: error
					? "Error"
					: isSuccess
					? "Screenshot sent!"
					: "Send Screenshot"}
			</button>
			{/* Channel list */}
			<ScreenshotChannelList
				containerRef={containerRef}
				selectedServer={selectedServer}
				sendScreenshot={sendScreenshot}
				open={open}
			/>
		</div>
	);
};

export default ScreenshotButton;
