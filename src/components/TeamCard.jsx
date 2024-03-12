const TeamCard = ({ data, number }) => {
	return (
		<div className="w-full bg-darkBlack rounded-xl flex flex-col gap-2 p-3 px-4">
			<p className="text-lg 2k:text-xl font-semibold text-center">Tiimi {number + 1}</p>
			<ul className="w-full flex flex-col gap-2">
				{data.map((e) => (
					// Player card
					<li key={"TeamPlayer" + e.id} className="w-full flex items-center h-12 py-2 gap-2">
						{/* Image container to take space while the image is loading */}
						<div className="h-full aspect-square">
							<img
								className="h-full rounded-full drop-shadow-md"
								src={e.image}
								alt={`${e.name} image`}
							/>
						</div>
						<p className="truncate text-base 2k:text-xl font-semibold drop-shadow-md">{e.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TeamCard;
