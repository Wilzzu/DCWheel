import { useContext, useRef } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import WheelContext from "../../contexts/WheelContext";
import { IoIosArrowUp } from "react-icons/io";
import useLocalStorage from "../../hooks/useLocalStorage";

const TeamSize = () => {
	const { playersPerTeam, setPlayersPerTeam } = useContext(WheelContext);
	const { setItem } = useLocalStorage();

	// Save the value in Context API and local storage
	const setAndSaveValue = (value) => {
		setPlayersPerTeam(value);
		setItem("wheelSettings", "players_per_team", value);
	};
	const ref = useRef(null);
	// Validate input
	const handleChange = () => {
		if (!ref.current.value || isNaN(ref.current.value) || ref.current.value <= 0) return;
		setAndSaveValue(parseInt(ref.current.value));
	};
	const handleUnfocus = () => {
		if (!ref.current.value || isNaN(ref.current.value) || ref.current.value <= 0)
			ref.current.value = playersPerTeam;
	};

	// Change team size with buttons
	const handlePlayersPerTeam = (decrement = false) => {
		if (decrement === true) {
			if (playersPerTeam <= 1) return;
			setAndSaveValue(playersPerTeam - 1);
			return (ref.current.value = playersPerTeam - 1);
		}
		setAndSaveValue(playersPerTeam + 1);
		ref.current.value = playersPerTeam + 1;
	};

	return (
		<div className="flex flex-col items-center">
			<p>Team size</p>
			<div className="flex items-center gap-1 bg-darkBlack rounded-lg px-2 h-10">
				<HiOutlineUserGroup className="h-6 w-auto mr-[0.2rem]" />
				<input
					ref={ref}
					defaultValue={playersPerTeam}
					type="number"
					name="playersPerTeam"
					id="playersPerTeam"
					onClick={(e) => e.target.select()}
					onChange={handleChange}
					onBlur={handleUnfocus}
					className="text-center outline-none font-bold bg-neutral-700 rounded-md h-7 2xl:h-8 w-8 2xl:w-9"
				/>
				{/* Buttons */}
				<div className="h-full flex flex-col justify-center">
					<button onClick={handlePlayersPerTeam}>
						<IoIosArrowUp />
					</button>
					<button onClick={() => handlePlayersPerTeam(true)}>
						<IoIosArrowUp className="rotate-180" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TeamSize;
