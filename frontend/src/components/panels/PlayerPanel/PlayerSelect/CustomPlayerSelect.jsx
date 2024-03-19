import { useContext, useRef, useState } from "react";
import WheelContext from "../../../../contexts/WheelContext";
import { v4 as uuidv4 } from "uuid";
// import useCustomPlayerImage from "../hooks/useCustomPlayerImage";

const CustomPlayerSelect = () => {
	// const { data, refetch } = useCustomPlayerImage();
	// const [newPlayerQueue, setNewPlayerQueue] = useState([]);
	const ref = useRef(null);
	const [imgCount, setImgCount] = useState(0);

	const { addPlayer } = useContext(WheelContext);

	// Create new player and add them to the player list
	const newPlayer = (name, avatar) => {
		const player = {
			name,
			avatar,
			id: uuidv4(),
		};

		addPlayer(player);
	};

	const chooseImg = () => {
		setImgCount((prev) => prev + 1);
		return `/custom-icons/custom${imgCount % 10}.svg`;
	};

	const handleSubmit = () => {
		if (!ref.current.value) return;
		newPlayer(ref.current.value, chooseImg());
		ref.current.value = "";
	};

	// Add new player to the queue and find a new image for them
	// const handleSubmit = () => {
	// 	if (!ref.current.value) return;
	// 	setNewPlayerQueue((prev) => [...prev, ref.current.value]);
	// 	refetch();
	// };

	// When custom image is created add the new custom user
	// useEffect(() => {
	// 	if (!data) return;
	// 	props.addPlayer(newPlayerQueue[0], data);
	// 	setNewPlayerQueue((prev) => [...prev].slice(1));
	// }, [data]);

	// Clear input field after adding new player
	// useEffect(() => {
	// 	ref.current.value = "";
	// }, [newPlayerQueue]);

	return (
		<div className="w-full flex flex-col gap-2 text-white">
			<div className="w-full flex gap-2 2xl:gap-4">
				<input
					ref={ref}
					className="w-full outline-none border-highlightBlack border-2 px-4 rounded-lg h-8 2xl:h-12 bg-darkBlack text-base hover:bg-highlightBlack focus:bg-highlightBlack placeholder:text-neutral-400 duration-100"
					type="text"
					placeholder="Add custom player..."
					// name="customPlayer"
					onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
				/>
				<button
					onClick={handleSubmit}
					className="w-12 h-12 aspect-square bg-green-500 border-2 border-green-500 duration-150 rounded-xl hover:bg-green-600">
					<p className="text-3xl drop-shadow-icon">+</p>
				</button>
			</div>
			<p className="text-xs opacity-50 text-center">
				You can also press {'"Enter"'} to add a player.
			</p>
		</div>
	);
};

export default CustomPlayerSelect;
