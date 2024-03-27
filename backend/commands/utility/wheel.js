const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("wheel").setDescription("Link to DCWheel"),
	async execute(interaction) {
		await interaction
			.reply({ content: "Spin the wheel at: https://dcwheel.wilzzu.dev/" })
			.catch((error) => {
				interaction.followUp({
					content: "Spin the wheel at: https://dcwheel.wilzzu.dev/",
					ephemeral: true,
				});
			});
	},
};
