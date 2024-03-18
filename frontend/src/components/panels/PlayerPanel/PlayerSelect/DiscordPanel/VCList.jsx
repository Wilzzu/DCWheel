import VCCard from "./VCCard";

const VCList = ({ isLoading, isRefetching, isError, error, data }) => {
	return (
		<ul className="absolute top-[3.25rem] max-h-[30rem] w-3/4 p-2 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10">
			{data?.channels?.map((channel) => (
				<li key={channel.id}>
					<VCCard channel={channel} />
				</li>
			))}
		</ul>
	);
};

export default VCList;
