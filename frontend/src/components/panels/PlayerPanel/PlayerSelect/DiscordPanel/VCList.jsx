import VCCard from "./VCCard";

const VCList = ({ isLoading, isRefetching, isError, error, data }) => {
	return (
		<ul className="absolute top-12 max-h-[30rem] w-full p-1 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10">
			{data?.channels?.map((channel) => (
				<li key={channel.id}>
					<VCCard channel={channel} />
				</li>
			))}
		</ul>
	);
};

export default VCList;
