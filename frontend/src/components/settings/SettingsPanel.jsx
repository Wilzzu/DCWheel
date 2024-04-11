import { cn } from "../../../lib/utils";
import TeamSize from "./TeamSize";
import SpinSpeed from "./SpinSpeed";
import PickingOrder from "./PickingOrder";
import Autospin from "./Autospin";
import ReturnToMenu from "./ReturnToMenu";
import Mute from "./Mute";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import WheelContext from "../../contexts/WheelContext";
import useWindowSize from "../../hooks/useWindowSize";

const SettingsPanel = ({ ongoing }) => {
	const { allPlayersDrawn } = useContext(WheelContext);
	const { width } = useWindowSize();
	const ref = useRef(null);

	// When new teams are added, the settings panel will change position
	// Keep the settings panel in view by scrolling to the bottom of it
	// This will also show the newest team by default, so we don't need another function for it
	const scrollToElement = () => {
		if (allPlayersDrawn || width <= 1024) return;
		ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
	};

	return (
		<motion.div
			ref={ref}
			layout
			transition={{ layout: { duration: 0.2 } }}
			onLayoutAnimationStart={scrollToElement}
			className={cn(
				"mt-2 w-full text-xs 2k:text-sm bg-gradient-to-r from-normalBlack to-highlightBlack rounded-lg text-white flex px-2 py-1 items-center justify-between border-2 2xl:border-4 border-highlightBlack shadow-xl shadow-[#1E1E1E] z-10"
			)}>
			{/* Settings items */}
			{!ongoing ? (
				<>
					<TeamSize />
					<SpinSpeed layout="speedMenu" />
					<PickingOrder />
					<Mute />
				</>
			) : (
				<>
					<SpinSpeed layout="speedOngoing" />
					<Autospin />
					<Mute />
					<ReturnToMenu />
				</>
			)}
		</motion.div>
	);
};

export default SettingsPanel;
