import { useEffect, useState } from "react";
import ErrorCard from "./ErrorCard";
import LoadingPlaceholder from "./LoadingPlaceholder";
import VCCard from "./VCCard";

const VCList = ({ isLoading, isRefetching, isError, error, data, showLoading, setShowLoading }) => {
	const [first, setFirst] = useState(true);
	// Show loading spinner only on the first load and when force refetching
	useEffect(() => {
		if (first && (isRefetching || isLoading)) setFirst(false);
		if (!first && !isRefetching && !isLoading) setShowLoading(false);
	}, [isRefetching, isLoading]);

	if (showLoading) {
		if (isRefetching) return <LoadingPlaceholder />;
		if (isLoading) return <LoadingPlaceholder />;
	}

	if (isError) return <ErrorCard content={error?.response?.data?.error || error.message} />;
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
