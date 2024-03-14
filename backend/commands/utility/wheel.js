const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("wheel").setDescription("Link to DCWheel"),
	async execute(interaction) {
		await interaction.reply({ content: "Link to DCWheel" }).catch((error) => {
			interaction.followUp({
				content: "Link to DCWheel",
				ephemeral: true,
			});
		});
	},
};
