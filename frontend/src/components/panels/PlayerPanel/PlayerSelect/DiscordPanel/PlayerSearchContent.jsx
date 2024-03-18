const PlayerSearchContent = () => {
	return (
		<div className="absolute top-[3.25rem] right-0 max-h-[30rem] w-3/4 p-1 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10 drop-shadow-button">
			<input
				type="text"
				placeholder="Search players..."
				className="h-full w-full bg-red-500 outline-none"
			/>
			<button
				onClick={(e) => {
					e.stopPropagation();
					console.log("1");
				}}>
				1
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					console.log("2");
				}}>
				2
			</button>
		</div>
	);
};

export default PlayerSearchContent;
