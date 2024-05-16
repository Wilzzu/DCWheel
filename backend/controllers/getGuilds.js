const { client } = require("../bot");
const axios = require("axios");

// GET /api/guilds
module.exports = async function getGuilds(req, res) {
	const accessToken = req.headers.authorization?.split(" ")[1];

	// Get both bot and user guilds
	const botGuilds = client.guilds.cache.map((guild) => guild.id);
	const userGuilds = await axios
		.get("https://discord.com/api/users/@me/guilds", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			return null;
		});

	// Check if any guilds were found
	if (userGuilds === null || userGuilds === "error") {
		return res.status(404).json({ error: "Error fetching guilds" });
	}
	if (!userGuilds) return res.status(200).json({ success: true, guilds: [] });

	// Filter out the guilds the bot is not in
	const availableGuilds = userGuilds.filter((guild) => botGuilds.includes(guild.id));
	if (availableGuilds.length === 0) return res.status(200).json({ success: true, guilds: [] });

	// Create a response with the available guilds
	const response = availableGuilds.map((guild) => ({
		id: guild.id,
		name: guild.name,
		icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
	}));

	return res.status(200).json({ success: true, guilds: response });
};
