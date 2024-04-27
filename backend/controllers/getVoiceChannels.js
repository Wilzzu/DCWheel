const axios = require("axios");
const { client } = require("../bot");

// GET /api/voicechannels
module.exports = async function getVoiceChannels(req, res) {
	console.log("GET /api/voicechannels", new Date().toLocaleString());
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
		?.filter((channel) => channel.type === 2) // Get only voice channels
		.map((channel) => ({
			id: channel.id,
			name: channel.name,
			members: channel.members,
		}));

	// Remove bots from the list and format members
	const filteredChannels = channels?.reduce((acc, channel) => {
		const members = Array.from(channel?.members?.values())
			.filter((member) => !member.user.bot)
			.map((member) => ({
				id: member.id,
				name: member.nickname || member.user.globalName || member.user.username,
				avatar: member.user.displayAvatarURL(),
			}));

		if (members?.length > 0) acc.push({ ...channel, members });
		return acc;
	}, []);

	// Check if any channels are left after filtering
	if (!filteredChannels?.length) return res.status(200).json({ success: true, channels: [] });
	return res.status(200).json({ success: true, channels: filteredChannels });
};
