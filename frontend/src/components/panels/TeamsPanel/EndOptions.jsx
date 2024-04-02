import useSendScreenshot from "../../../api/useSendScreenshot";
import { PiImagesSquare } from "react-icons/pi";
import { cn } from "../../../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { LuArrowRightLeft } from "react-icons/lu";

const itemVariant = {
	hidden: { y: -7, opacity: 0 },
	visible: { y: 0, opacity: 1 },
	exit: { y: -5, opacity: 0 },
};

const EndOptions = ({ containerRef, teams }) => {
	const [show, setShow] = useState(true);
	const { sendScreenshot, isLoading, error, isSuccess, reset } = useSendScreenshot();
	const { getItem } = useLocalStorage();
	const providerToken = getItem("DCWAuth", "provider_token") || null;

	// Hide the button after the screenshot has been sent with a delay
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => setShow(false), 2500);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (error) {
			setTimeout(() => reset(), 4500);
		}
	}, [error]);

	// Show button again if teams are changed
	useEffect(() => {
		reset();
		setShow(true);
	}, [teams]);

	return (
		<div className="w-full flex items-center justify-center mt-2">
			<AnimatePresence mode="wait">
				{show && providerToken && (
					<motion.div
						key="endOptions"
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={{ duration: 0.5, ease: "easeInOut", delay: 0.7 }}
						variants={itemVariant}
						className="flex gap-4 items-center justify-center w-full">
						{/* Hint text */}
						<div className="flex gap-2">
							<LuArrowRightLeft className="w-6 h-6" />
							<p className="text-sm text-center">Drag players to change teams</p>
						</div>
						{/* Screenshot button */}
						<button
							disabled={isLoading || isSuccess || error}
							className={cn(
								"flex items-center justify-center min-w-48 gap-2 p-4 text-white bg-normalBlack border-2 border-highlightBlack rounded-md hover:bg-highlightBlack duration-150 disabled:hover:bg-normalBlack disabled:cursor-default disabled:opacity-70",
								isSuccess &&
									"disabled:opacity-100 disabled:hover:bg-green-900 bg-green-900 border-green-500 duration-300"
							)}
							onClick={() => sendScreenshot(containerRef)}>
							<PiImagesSquare className="w-6 h-6" />
							{isLoading
								? "Sending..."
								: error
								? "Error"
								: isSuccess
								? "Screenshot sent!"
								: "Send Screenshot"}
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default EndOptions;
