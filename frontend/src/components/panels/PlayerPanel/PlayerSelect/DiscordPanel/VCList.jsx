import { useEffect } from "react";
import ErrorCard from "./ErrorCard";
import LoadingPlaceholder from "./LoadingPlaceholder";
import VCCard from "./VCCard";

const VCList = ({ isLoading, isRefetching, isError, error, data, showLoading, setShowLoading }) => {
	// Show loading spinner only on the first load and when force refetching
	useEffect(() => {
		if (!isRefetching && !isLoading) setShowLoading(false);
	}, [isRefetching, isLoading]);

	if (showLoading) {
		if (isRefetching) return <LoadingPlaceholder />;
		if (isLoading) return <LoadingPlaceholder />;
	}

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
