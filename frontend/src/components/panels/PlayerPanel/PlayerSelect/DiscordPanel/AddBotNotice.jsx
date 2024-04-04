const AddBotNotice = () => {
	return (
		<div className="text-center text-sm">
			<p>
				The <b>DCWheel bot</b> is not added to any of your servers. To see you server here, add the
				bot using the button below.
			</p>
			<div className="h-16 flex justify-center items-center">
				<a
					href={import.meta.env.VITE_DISCORD_BOT_INVITE_LINK}
					target="_blank"
					rel="noreferrer"
					className="py-2 px-4 bg-highlightBlack hover:bg-normalBlack duration-150 rounded-md">
					Add DCWheel bot to your server
				</a>
			</div>
		</div>
	);
};

export default AddBotNotice;
