const RemoveAllButton = ({ players, setPlayers }) => {
	return (
		<div className="absolute w-full bottom-2 left-0 flex justify-center pointer-events-none">
			<button
				onClick={() => setPlayers([])}
				disabled={players.length === 0}
				className="text-white pointer-events-auto px-8 py-2 border-2 border-red-600 bg-red-600 rounded-xl bg-opacity-50 backdrop-blur shadow-2xl shadow-red-700 duration-150 hover:bg-opacity-80 disabled:hover:bg-opacity-50 disabled:opacity-50 disabled:hover:cursor-default disabled:hover:bg-red-600">
				Remove all
			</button>
		</div>
	);
};

export default RemoveAllButton;
