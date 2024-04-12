import { useEffect, useRef, useState } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";
import useGetGuilds from "../../../../../api/useGetGuilds";
import ServerList from "./ServerList";
import { FaDiscord } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import useClickOutside from "../../../../../hooks/useClickOutside";
import BotInviteButton from "./BotInviteButton";

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
		<div className="relative w-full h-10 2xl:h-12 text-white flex items-center justify-start">
			{/* Server select dropdown button */}
			<button
				ref={dropdownButton}
				onClick={toggleOpen}
				className="h-full w-full flex items-center justify-between p-3 2xl:px-4 bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack rounded-md 2xl:rounded-lg">
				<span className="flex items-center gap-2">
					{selectedServer ? (
						<>
							{selectedServer.icon ? (
								<img
									src={selectedServer.icon}
									alt={selectedServer.name + " icon"}
									className="h-6 2xl:h-7 w-auto aspect-square rounded-full"
								/> // Server icon placeholder
							) : (
								<div className="flex items-center justify-center h-7 w-7 aspect-square bg-[#5865F2] rounded-full">
									<p className="text-neutral-100 text-center text-sm">
										{selectedServer.name[0].toUpperCase()}
									</p>
								</div>
							)}
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
				{!open && <FaAngleDown className="h-5 2xl:h-6 w-auto mt-1 pointer-events-none" />}
			</button>

			{/* Show list of servers */}
			{open && (
				<>
					<div className="absolute top-11 2xl:top-[3.25rem] w-full p-2 bg-darkBlack rounded-md border-2 border-highlightBlack z-10 drop-shadow 2xl:drop-shadow-button">
						<ServerList
							isLoading={isLoading}
							isRefetching={isRefetching}
							isError={isError}
							error={error}
							data={data}
							selectedServer={selectedServer}
						/>
						<BotInviteButton />
					</div>
					{/* Refresh button */}
					<button
						ref={buttonRef}
						disabled={disabled}
						onClick={forceRefetch}
						className="absolute right-4 h-8 2xl:h-10 duration-300 hover:text-green-400 disabled:hover:text-white disabled:opacity-30">
						<IoMdRefresh className="h-5 2xl:h-6 w-auto" />
					</button>
				</>
			)}
		</div>
	);
};

export default ServerDropdown;
