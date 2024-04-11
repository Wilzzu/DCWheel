import { useContext, useRef, useState } from "react";
import WheelContext from "../../../../contexts/WheelContext";
import { v4 as uuidv4 } from "uuid";
import { FiPlus } from "react-icons/fi";
// import useCustomPlayerImage from "../hooks/useCustomPlayerImage";

const CustomPlayerSelect = () => {
	// const { data, refetch } = useCustomPlayerImage();
	// const [newPlayerQueue, setNewPlayerQueue] = useState([]);
	const ref = useRef(null);
	const [imgCount, setImgCount] = useState(0);
	const [disabled, setDisabled] = useState(true);

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
		setDisabled(true);
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
		<div className="w-full flex gap-2 2xl:gap-2 text-white">
			<input
				ref={ref}
				className="w-full outline-none border-highlightBlack border-2 px-3 2xl:px-4 rounded-md 2xl:rounded-lg h-10 2xl:h-12 bg-darkBlack hover:bg-highlightBlack focus:bg-highlightBlack placeholder:text-neutral-400 duration-100"
				type="text"
				placeholder="Add custom player..."
				onChange={(e) => (e.target.value ? setDisabled(false) : setDisabled(true))}
				onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
			/>
			<button
				onClick={handleSubmit}
				disabled={disabled}
				className="border-2 rounded-md 2xl:rounded-lg px-[0.6rem] disabled:opacity-70 disabled:bg-darkBlack disabled:hover:bg-darkBlack disabled:border-highlightBlack disabled:hover:shadow-none bg-green-600 hover:bg-green-500 hover:shadow-green-500 hover:shadow-middle border-green-500 duration-150">
				<FiPlus className="h-4 2xl:h-6 w-auto drop-shadow" />
			</button>
		</div>
	);
};

export default CustomPlayerSelect;
