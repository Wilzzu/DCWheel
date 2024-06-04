import { useContext } from "react";
import DeleteIcon from "../../../assets/DeleteIcon.jsx";
import WheelContext from "../../../contexts/WheelContext.js";
import { motion } from "framer-motion";

const PlayerCard = ({ player }) => {
	const { removePlayer } = useContext(WheelContext);

	return (
		<motion.li
			layout
			initial={{ y: -10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 10, opacity: 0, transition: { duration: 0.1 } }}
			transition={{ duration: 0.2, layout: { duration: 0.1 } }}>
			<button
				onClick={() => removePlayer(player.id)}
				className="group w-full h-9 2xl:h-11 2k:h-12 bg-darkBlack border-2 border-darkBlack drop-shadow-button rounded-lg 2xl:rounded-xl flex gap-2 2xl:gap-3 py-1 px-2 items-center hover:cursor-pointer hover:bg-red-900 hover:border-red-600 focus:bg-red-900 focus:outline-red-600">
				{/* Avatar */}
				<div className="h-6 2xl:h-8 w-6 2xl:w-8 aspect-square flex-shrink-0">
					<img
						className="h-6 2xl:h-8 w-6 2xl:w-8 aspect-square drop-shadow-md rounded-full"
						src={player.avatar}
						alt={`${player.name} avatar`}
					/>
				</div>
				{/* Name */}
				<p
					className="w-full truncate 2xl:text-lg text-white drop-shadow-md text-left"
					title={player.name}>
					{player.name}
				</p>
				{/* Delete icon */}
				<div className="h-full flex items-center justify-center opacity-40 p-[0.1rem] group-hover:opacity-100 group-hover:drop-shadow-md">
					<DeleteIcon className="w-4 2xl:w-6 h-4 2xl:h-6 stroke-neutral-500 group-hover:stroke-white group-focus:stroke-white" />
				</div>
			</button>
		</motion.li>
	);
};

export default PlayerCard;
