import { useContext } from "react";
import ServerDropdown from "./ServerDropdown";
import { FiLogOut } from "react-icons/fi";
import DiscordContext from "../../../../../contexts/DiscordContext";
import VCDropdown from "./VCDropdown";
import PlayerSearch from "./PlayerSearch";

const DiscordPlayerSelect = ({ handleLogout }) => {
	const { selectedServer } = useContext(DiscordContext);

	return (
		<>
			<div className="flex gap-2 justify-between">
				<ServerDropdown selectedServer={selectedServer} />
				{/* Log out button */}
				<button
					onClick={handleLogout}
					className="flex items-center justify-center gap-2 h-full bg-darkBlack hover:bg-highlightBlack duration-150 border-2 border-highlightBlack text-sm rounded-lg text-nowrap px-3">
					<FiLogOut className="h-6 w-auto" />
					<p>Log out</p>
				</button>
			</div>
			{selectedServer && (
				<div className="flex gap-2 justify-between">
					<VCDropdown />
					<PlayerSearch />
				</div>
			)}
		</>
	);
};

export default DiscordPlayerSelect;
