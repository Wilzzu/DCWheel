const { client } = require("../bot");
const axios = require("axios");

// GET /api/guilds
module.exports = async function getGuilds(req, res) {
	console.log("GET /api/guilds");
	console.log(req.headers.authorization);
	const accessToken = req.headers.authorization?.split(" ")[1];
	if (!accessToken || accessToken === "undefined" || accessToken === "null") {
		return res.status(403).json({ error: "No credentials" });
	}

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
			console.error(err.message, "Token:", accessToken);
			return "error";
		});

	// Check if any guilds were found
	if (!userGuilds) return res.status(200).json({ success: true, guilds: [] });
	if (userGuilds === "error")
		return res.status(403).json({ error: "Couldn't fetch user's guilds" });

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
