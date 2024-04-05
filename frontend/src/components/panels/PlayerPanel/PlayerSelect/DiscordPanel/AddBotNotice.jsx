const AddBotNotice = () => {
	return (
		<div className="flex items-center justify-center mt-2 pt-2 border-t-2 border-highlightBlack text-xs 2k:text-sm">
			<a
				href={import.meta.env.VITE_DISCORD_BOT_INVITE_LINK}
				target="_blank"
				rel="noreferrer"
				className="py-2 px-1 w-full border-2 border-highlightBlack bg-normalBlack hover:bg-highlightBlack duration-150 rounded-md text-center opacity-90 hover:opacity-100 hover:border-green-500">
				Invite DCWheel bot to your server
			</a>
		</div>
	);
};

export default AddBotNotice;
