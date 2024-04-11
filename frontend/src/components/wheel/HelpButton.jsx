import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

const HelpButton = ({ ongoing, players }) => {
	return (
		<motion.div
			initial={{ scale: 1.1, opacity: 0, rotate: 0.001 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				scale: { type: "spring", stiffness: 30, damping: 4 },
				opacity: { duration: 0.8, ease: "easeInOut" },
			}}
			className={cn(
				"absolute py-2 lg:py-4 px-4 lg:px-6 2k:py-6 2k:px-8 rounded-lg lg:rounded-2xl bg-green-600 border-2 border-green-400 bg-opacity-90 backdrop-blur-sm shadow-3xl shadow-green-500 text-white pointer-events-none",
				!ongoing && players.length <= 0 && "bg-red-600 border-2 border-red-400 shadow-red-600",
				ongoing && "hidden"
			)}>
			<p
				className={cn(
					"font-outfit text-lg lg:text-3xl 2k:text-5xl",
					players.length <= 0 && "pr-5 lg:pr-11 2k:pr-[4.2rem]"
				)}>
				{players.length > 0 ? (
					"Click the wheel to spin!"
				) : (
					<>
						Add players{" "}
						<span className="ml-[0.3rem] 2k:ml-2 absolute animate-point-down lg:animate-point-right rotate-90 lg:rotate-0">
							{"👉"}
						</span>
					</>
				)}
			</p>
		</motion.div>
	);
};

export default HelpButton;
