import { useEffect, useState } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import useGetGuilds from "../../../../../api/useGetGuilds";
import ServerList from "./ServerList";
import { FaDiscord } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

const ServerSelect = ({ selectedServer }) => {
	const { getItem } = useLocalStorage();
	const [showServers, setShowServers] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const { isLoading, isRefetching, isError, data, error, refetch } = useGetGuilds(
		getItem("DCWAuth", "provider_token")
	);

	const toggleServers = () => {
		setShowServers((prev) => !prev);
		if (!data && !isLoading) refetch();
	};

	const forceRefetch = () => {
		refetch();
		setDisabled(true);
	};

	useEffect(() => {
		if (!isRefetching) setTimeout(() => setDisabled(false), 5000);
	}, [isRefetching]);

	return (
		<div className="relative w-full h-12 text-white bg-darkBlack hover:bg-highlightBlack duration-150 rounded-lg border-2 flex items-center justify-start border-highlightBlack">
			{/* Server select dropdown button */}
			<button
				onClick={toggleServers}
				className="h-full w-full flex items-center justify-between px-4">
				<span className="flex items-center gap-2">
					{selectedServer ? (
						<>
							<img src={selectedServer.icon} alt="" className="h-7 w-auto rounded-full" />
							{selectedServer.name}
						</>
					) : (
						<>
							<FaDiscord className="h-5 w-auto mt-[0.1rem]" />
							Select server...
						</>
					)}
				</span>
				{!showServers && <FaAngleDown className="h-6 w-auto mt-1" />}
			</button>
			{showServers && (
				<>
					<ServerList
						isLoading={isLoading}
						isRefetching={isRefetching}
						isError={isError}
						error={error}
						data={data}
						selectedServer={selectedServer}
					/>
					{/* Refresh button */}
					<button
						disabled={disabled}
						onClick={forceRefetch}
						className="absolute right-4 h-10 duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-40">
						<IoMdRefresh className="h-6 w-auto" />
					</button>
				</>
			)}
		</div>
	);
};

export default ServerSelect;
