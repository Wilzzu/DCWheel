import { cn } from "../../../../../../lib/utils";
import { motion } from "framer-motion";

const PlayerSearch = () => {
	return (
		<motion.div
			layout
			className={cn("relative grow h-12 text-white flex items-center justify-start")}>
			<p>Player search</p>
		</motion.div>
	);
};

export default PlayerSearch;
