import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { LuArrowRightLeft } from "react-icons/lu";
import ScreenshotButton from "./ScreenshotButton";
import DiscordContext from "../../../contexts/DiscordContext";

const itemVariant = {
	hidden: { y: -7, opacity: 0 },
	visible: { y: 0, opacity: 1 },
	exit: { y: -5, opacity: 0 },
};

const EndOptions = ({ mainRef, containerRef }) => {
	const { selectedServer } = useContext(DiscordContext);
	const { getItem } = useLocalStorage();
	const providerToken = getItem("DCWAuth", "provider_token") || null;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => setOpen(true), 600);
	}, []);

	return (
		<motion.div
			key="endOptions"
			initial="hidden"
			animate="visible"
			exit="exit"
			layout
			variants={itemVariant}
			className="w-full flex items-center justify-center h-16 mt-2">
			<AnimatePresence>
				{open && (
					<>
						{/* Hint text */}
						<motion.div
							variants={itemVariant}
							transition={{ duration: 0.5, ease: "easeInOut" }}
							className="flex gap-1 2xl:gap-2 items-center">
							<LuArrowRightLeft className="w-4 2xl:w-6 h-4 2xl:h-6 flex-shrink-0" />
							<p className="text-xs 2xl:text-sm text-center">Drag players to change teams</p>
						</motion.div>
						{providerToken && selectedServer && (
							<ScreenshotButton
								mainRef={mainRef}
								containerRef={containerRef}
								selectedServer={selectedServer}
							/>
						)}
					</>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default EndOptions;
