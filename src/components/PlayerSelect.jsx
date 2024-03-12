import CustomPlayerSelect from "./CustomPlayerSelect";
// import DiscordPlayerSelect from "./DiscordPlayerSelect";

const PlayerSelect = () => {
	return (
		<div className="flex flex-col gap-3">
			{/* <DiscordPlayerSelect /> */}
			<p className="text-center text-white text-lg 2xl:text-2xl opacity-60">or</p>
			<CustomPlayerSelect />
		</div>
	);
};

export default PlayerSelect;
