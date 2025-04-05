import { motion } from "framer-motion";

const MoveTeamToVCDropdown = ({ data, teamNumber }) => {
	return (
		<motion.div>
			<button>Move Team {teamNumber} to VC</button>
		</motion.div>
	);
};

export default MoveTeamToVCDropdown;
