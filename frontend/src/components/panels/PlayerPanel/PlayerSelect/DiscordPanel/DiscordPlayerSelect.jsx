import { useContext } from "react";
import ServerSelect from "./ServerSelect";
import { FiLogOut } from "react-icons/fi";
import DiscordContext from "../../../../../contexts/DiscordContext";
import VCSelect from "./VCSelect";
import PlayerSearch from "./PlayerSearch";

const DiscordPlayerSelect = ({ handleLogout }) => {
	const { selectedServer } = useContext(DiscordContext);

	return (
		<>
			<div className="flex gap-2 justify-between">
				<ServerSelect selectedServer={selectedServer} />
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
					<VCSelect />
					<PlayerSearch />
				</div>
			)}
		</>
	);
};

export default DiscordPlayerSelect;
