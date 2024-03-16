import VCCard from "./VCCard";

const VCList = ({ isLoading, isRefetching, isError, error, data, favorites }) => {
	return (
		<ul className="absolute top-12 max-h-56 w-full p-1 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10">
			{data?.guilds?.map((channel) => (
				<li key={channel.id}>
					<VCCard channel={channel} favorites={favorites} />
				</li>
			))}
		</ul>
	);
};

export default VCList;
