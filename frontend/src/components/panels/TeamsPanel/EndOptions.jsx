import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { LuArrowRightLeft } from "react-icons/lu";
import ScreenshotButton from "./ScreenshotButton";

const itemVariant = {
	hidden: { y: -7, opacity: 0 },
	visible: { y: 0, opacity: 1 },
	exit: { y: -5, opacity: 0 },
};

const EndOptions = ({ containerRef, teams }) => {
	const [show, setShow] = useState(true);

	const { getItem } = useLocalStorage();
	const providerToken = getItem("DCWAuth", "provider_token") || null;

	// Show button again if teams are changed
	useEffect(() => {
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
						<ScreenshotButton containerRef={containerRef} setShow={setShow} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default EndOptions;
