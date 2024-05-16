const axios = require("axios");
const { client } = require("../bot");

// GET /api/textchannels
module.exports = async function getTextChannels(req, res) {
	const accessToken = req.headers.authorization?.split(" ")[1];

	// Confirm user is part of the guild
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

	if (!userGuilds) return res.status(404).json({ error: "Error fetching channels" });
	if (!userGuilds.find((guild) => guild?.id === req.query?.guildId))
		return res.status(401).json({ error: "Unauthorized" });

	// Get channels
	const guild = client.guilds.cache.get(req.query.guildId);
	const channels = guild?.channels?.cache
		?.filter((channel) => channel.type === 0) // Get only text channels
		.map((channel) => ({
			id: channel.id,
			name: channel.name,
		}));

	// Check if any channels are left after filtering
	if (!channels?.length) return res.status(200).json({ success: true, channels: [] });
	return res.status(200).json({ success: true, channels: channels });
};
