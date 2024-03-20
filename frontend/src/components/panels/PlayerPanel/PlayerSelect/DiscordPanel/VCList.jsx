import ErrorCard from "./ErrorCard";
import LoadingPlaceholder from "./LoadingPlaceholder";
import VCCard from "./VCCard";

const VCList = ({ isLoading, isRefetching, isError, error, data }) => {
	if (isRefetching) return <LoadingPlaceholder />;
	if (isLoading) return <LoadingPlaceholder />;
	if (isError) return <ErrorCard content={error.message} />;
	if (!data?.channels?.length) return <ErrorCard content={"All voice channels are empty!"} />;

	return (
		<>
			{data?.channels?.map((channel) => (
				<li key={channel.id}>
					<VCCard channel={channel} />
				</li>
			))}
		</>
	);
};

export default VCList;
