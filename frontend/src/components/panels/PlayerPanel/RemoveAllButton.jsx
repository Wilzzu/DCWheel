import DeleteIcon from "../../../assets/DeleteIcon";

const RemoveAllButton = ({ players, setPlayers }) => {
	return (
		<div className="group absolute right-0 flex justify-center">
			<button
				onClick={() => setPlayers([])}
				disabled={players.length === 0}
				className="flex peer justify-center items-center w-10 h-10 border-2 rounded-lg bg-darkBlack border-darkBlack hover:bg-highlightBlack hover:border-red-600 disabled:hover:bg-darkBlack disabled:hover:border-darkBlack disabled:opacity-50 duration-300 drop-shadow-button">
				<DeleteIcon className="stroke-red-500 w-5 h-5" />
			</button>
			{/* Tooltip | Due to z-index fighting, there's an additional div to always show tooltip on top of other elements */}
			{players.length > 0 && (
				<div className="absolute z-0 peer-hover:z-10 flex justify-center">
					<span className="absolute text-[5px] font-medium group-hover:text-xs rounded-md text-nowrap -top-2 px-2 py-[0.36rem] bg-red-800 border border-red-600 opacity-0 group-hover:-top-9 group-hover:opacity-100 duration-200">
						Remove all
					</span>
				</div>
			)}
		</div>
	);
};

export default RemoveAllButton;
