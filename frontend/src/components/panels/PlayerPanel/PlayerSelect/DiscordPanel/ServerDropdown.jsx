import { useEffect, useRef, useState } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import useGetGuilds from "../../../../../api/useGetGuilds";
import ServerList from "./ServerList";
import { FaDiscord } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import useClickOutside from "../../../../../hooks/useClickOutside";

const ServerDropdown = ({ selectedServer }) => {
	const { getItem } = useLocalStorage();
	const [disabled, setDisabled] = useState(false);

	const dropdownButton = useRef(null);
	const buttonRef = useRef(null);
	const { open, setOpen } = useClickOutside(dropdownButton, buttonRef);

	const { isLoading, isRefetching, isError, data, error, refetch } = useGetGuilds(
		getItem("DCWAuth", "provider_token")
	);

	const toggleOpen = () => {
		setOpen((prev) => !prev);
		if (!data && !isLoading) refetch();
	};

	const forceRefetch = () => {
		refetch();
		setDisabled(true);
	};

	// Enable refresh button after some time
	useEffect(() => {
		if (!isRefetching) setTimeout(() => setDisabled(false), 5000);
	}, [isRefetching]);

	return (
		<div className="relative w-full h-12 text-white flex items-center justify-start">
			{/* Server select dropdown button */}
			<button
				ref={dropdownButton}
				onClick={toggleOpen}
				className="h-full w-full flex items-center justify-between px-4 bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack rounded-lg">
				<span className="flex items-center gap-2">
					{selectedServer ? (
						<>
							<img
								src={selectedServer.icon}
								alt={selectedServer.name + " icon"}
								className="h-7 w-auto aspect-square rounded-full"
							/>
							<p className="w-full truncate" title={selectedServer.name}>
								{selectedServer.name}
							</p>
						</>
					) : (
						<>
							<FaDiscord className="h-5 w-auto mt-[0.1rem]" />
							Select server...
						</>
					)}
				</span>
				{!open && <FaAngleDown className="h-6 w-auto mt-1" />}
			</button>

			{/* Show list of servers */}
			{/* TODO: Make the scrollbar look better */}

			{open && (
				<>
					<ul className="absolute top-[3.25rem] max-h-[30rem] w-full p-2 overflow-y-auto bg-darkBlack rounded-md border-2 border-highlightBlack z-10 drop-shadow-button scrollbar scrollbar-thumb-green-500 scrollbar-thumb-rounded-full scrollbar-w-2">
						<ServerList
							isLoading={isLoading}
							isRefetching={isRefetching}
							isError={isError}
							error={error}
							data={data}
							selectedServer={selectedServer}
						/>
					</ul>
					{/* Refresh button */}
					<button
						ref={buttonRef}
						disabled={disabled}
						onClick={forceRefetch}
						className="absolute right-4 h-10 duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-30">
						<IoMdRefresh className="h-6 w-auto" />
					</button>
				</>
			)}
		</div>
	);
};

export default ServerDropdown;
