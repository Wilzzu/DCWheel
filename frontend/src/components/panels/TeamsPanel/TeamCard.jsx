import { motion } from "framer-motion";

const TeamCard = ({ data, index }) => {
	return (
		<motion.div
			layout
			className="w-full h-fit rounded-xl flex flex-col gap-2 p-3 overflow-hidden card-dark bg-gradient-to-tr border-2">
			<motion.p
				layout="position"
				initial={{ y: 2, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.25, ease: "easeInOut" }}
				className="text-lg 2k:text-xl font-semibold text-center">
				Team {index + 1}
			</motion.p>
			<ul className="w-full flex flex-col gap-2">
				{data.map((e, i) => (
					// Player card
					<motion.li
						layout="position"
						initial={{ y: i === 0 ? -2 : -8, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: i === 0 ? 0.25 : 0.35, ease: "easeInOut" }}
						key={"TeamPlayer" + e.id}
						className="w-full flex items-center h-12 py-2 gap-2">
						{/* Image container to take space while the image is loading */}
						<div className="h-full w-12 aspect-square">
							<img
								className="h-full w-full aspect-square rounded-full drop-shadow-md"
								src={e.image}
								alt={`${e.name} image`}
							/>
						</div>
						{/* Name */}
						<p
							className="truncate text-base 2k:text-xl font-semibold drop-shadow-md"
							title={e.name}>
							{e.name}
						</p>
					</motion.li>
				))}
			</ul>
		</motion.div>
	);
};

export default TeamCard;
