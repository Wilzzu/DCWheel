import { LuPlusCircle } from "react-icons/lu";
import LoadingPlaceholder from "./LoadingPlaceholder";
import ErrorCard from "./ErrorCard";
import { useState } from "react";

const PlayerSearchList = ({
	data,
	searchInput,
	addPlayer,
	isLoading,
	isRefetching,
	isError,
	error,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	if (isRefetching || isLoading) return <LoadingPlaceholder />;
	if (isError) return <ErrorCard content={error?.response?.data?.error || error?.message} />;
	if (!data?.length) {
		if (searchInput)
			return (
				<div className="p-2 gap-2 w-full text-sm text-center">
					<p>No players found.</p>
				</div>
			);
		return (
			<div className="p-2 gap-2 w-full text-sm text-center text-pretty">
				<p>All members from the server have been added!</p>
			</div>
		);
	}

	return (
		<ul>
			{data?.map((member) => (
				<li key={member.id}>
					<button
						onClick={() => addPlayer(member)}
						className="group relative flex items-center w-full gap-2 p-2 hover:bg-highlightBlack rounded-md">
						<img
							src={member.avatar}
							alt={member.name + " avatar"}
							className="w-8 h-8 rounded-full"
							loading="lazy"
							onLoad={() => setIsLoaded(true)}
						/>
						{!isLoaded && (
							<div className="absolute h-8 w-8 aspect-square bg-neutral-700 rounded-full animate-pulse" />
						)}
						<p className="w-full truncate text-left" title={member.name}>
							{member.name}
						</p>
						<LuPlusCircle className="w-7 h-7 opacity-20 group-hover:opacity-100" />
					</button>
				</li>
			))}
		</ul>
	);
};

export default PlayerSearchList;
