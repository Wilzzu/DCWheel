import { useContext, useEffect, useRef, useState } from "react";
import useSendScreenshot from "../../../api/useSendScreenshot";
import { PiImagesSquare } from "react-icons/pi";
import { cn } from "../../../../lib/utils";
import useClickOutside from "../../../hooks/useClickOutside";
import ScreenshotChannelList from "./ScreenshotChannelList";
import { motion, useAnimationControls } from "framer-motion";
import WheelContext from "../../../contexts/WheelContext";

const ScreenshotButton = ({ mainRef, containerRef, selectedServer }) => {
	const { teams } = useContext(WheelContext);
	const buttonRef = useRef(null);
	const { sendScreenshot, isLoading, error, isSuccess, reset } = useSendScreenshot();
	const { open, setOpen } = useClickOutside(buttonRef);
	const [show, setShow] = useState(true);

	// Use controls instead of presence, because otherwise hint text isn't animating correctly
	const controls = useAnimationControls();

	// Animate button in
	useEffect(() => {
		if (!show) return;
		controls.set({ y: -7, opacity: 0 });
		controls.start({ y: 0, opacity: 1 });
	}, [show]);

	// Animate button out
	const hideButton = async () => {
		await controls.start({ y: -5, opacity: 0 });
		await controls.start({ width: 0, margin: 0 }); // Change width and margin to 0 for the hint text to slide in smoothly
		setShow(false);
	};

	// Hide the button after the screenshot has been sent with a delay
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => hideButton(), 2500);
		}
	}, [isSuccess]);

	// Show button again whenever teams are changed
	useEffect(() => {
		reset();
		setShow(true);
	}, [teams]);

	// Reset button after error
	useEffect(() => {
		if (error) setTimeout(() => reset(), 4500);
	}, [error]);

	return (
		<>
			{show && (
				<motion.div
					animate={controls}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className={cn("relative", !show && "bg-red-500")}>
					<button
						ref={buttonRef}
						disabled={isLoading || isSuccess || error}
						className={cn(
							"flex items-center justify-center min-w-48 gap-2 p-4 ml-4 text-white bg-darkBlack border-2 border-highlightBlack rounded-md hover:bg-highlightBlack duration-150 disabled:hover:bg-normalBlack disabled:cursor-default disabled:opacity-70",
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
						mainRef={mainRef}
						containerRef={containerRef}
						selectedServer={selectedServer}
						sendScreenshot={sendScreenshot}
						open={open}
					/>
				</motion.div>
			)}
		</>
	);
};

export default ScreenshotButton;
