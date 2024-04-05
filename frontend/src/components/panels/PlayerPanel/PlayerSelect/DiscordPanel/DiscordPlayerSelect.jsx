import { useContext } from "react";
import ServerDropdown from "./ServerDropdown";
import DiscordContext from "../../../../../contexts/DiscordContext";
import VCDropdown from "./VCDropdown";
import PlayerSearch from "./PlayerSearchDropdown";
import LogOutButton from "./LogOutButton";

const DiscordPlayerSelect = ({ handleLogout }) => {
	const { selectedServer } = useContext(DiscordContext);

	return (
		<>
			<div className="flex gap-2 justify-between">
				<ServerDropdown selectedServer={selectedServer} />
				<LogOutButton handleLogout={handleLogout} />
			</div>
			{selectedServer && (
				<div className="relative flex gap-2 justify-between">
					<VCDropdown />
					<PlayerSearch />
				</div>
			)}
		</>
	);
};

export default DiscordPlayerSelect;
