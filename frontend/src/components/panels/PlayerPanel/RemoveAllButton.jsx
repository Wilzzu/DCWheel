import DeleteIcon from "../../../assets/DeleteIcon";

const RemoveAllButton = ({ players, setPlayers }) => {
	return (
		<div className="absolute right-0 flex justify-center">
			<button
				onClick={() => setPlayers([])}
				disabled={players.length === 0}
				className="relative group flex justify-center items-center w-10 h-10 border-2 rounded-lg bg-darkBlack border-darkBlack hover:bg-highlightBlack hover:border-red-600 disabled:hover:bg-darkBlack disabled:hover:border-darkBlack disabled:opacity-50 duration-300 drop-shadow-button">
				<DeleteIcon className="stroke-red-500 w-5 h-5" />
				<span className="absolute text-[5px] font-medium group-hover:text-xs rounded-md text-nowrap -top-2 px-2 py-[0.36rem] bg-red-800 border border-red-600 opacity-0 group-hover:-top-9 group-disabled:group-hover:opacity-0 group-hover:opacity-100 duration-200 z-0">
					Remove all
				</span>
			</button>
		</div>
	);
};

export default RemoveAllButton;
