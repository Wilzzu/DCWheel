import DeleteIcon from "../assets/DeleteIcon.jsx";

const PlayerCard = (props) => {
	const handleClick = () => {
		props.removePlayer(props.player.id);
	};

	return (
		<li
			onClick={handleClick}
			className="w-full h-10 2xl:h-12 bg-darkBlack border-2 border-darkBlack rounded-xl flex gap-2 py-1 px-2 items-center hover:cursor-pointer hover:bg-red-900 hover:border-red-600 duration-100 group">
			<img
				className="h-full drop-shadow-md rounded-full"
				src={props.player.image}
				alt={`${props.player.name} image`}
			/>
			<p
				className="w-full truncate 2xl:text-lg text-white drop-shadow-md"
				title={props.player.name}>
				{props.player.name}
			</p>
			<div className="h-full opacity-40 p-[0.1rem] group-hover:opacity-100 group-hover:drop-shadow-md">
				<DeleteIcon />
			</div>
		</li>
	);
};

export default PlayerCard;
