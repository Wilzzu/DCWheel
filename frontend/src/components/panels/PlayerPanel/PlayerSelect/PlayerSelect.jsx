import CustomPlayerSelect from "./CustomPlayerSelect";
import DiscordPanel from "./DiscordPanel/DiscordPanel";

const PlayerSelect = () => {
	return (
		<div className="flex flex-col gap-1 mb-2 drop-shadow-button z-10">
			<DiscordPanel />
			<p className="text-center text-white text-lg 2xl:text-xl opacity-60">or</p>
			<CustomPlayerSelect />
		</div>
	);
};

export default PlayerSelect;
