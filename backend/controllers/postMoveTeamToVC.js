const { client } = require("../bot");
const axios = require("axios");
const { userMention, channelMention, inlineCode } = require("discord.js");

const createEmbed = (userId, channelId, teamNumber) => {
	const user = userId ? userMention(userId) : "Unknown user";
	const channel = channelId ? channelMention(channelId) : "unknown channel";

	return { content: `## ${user} ${inlineCode(`moved Team ${teamNumber} to`)} ${channel}` };
};

const moveTeam = (guild, channel, team, userId) => {
	team.forEach(async (memberId) => {
		// Return if custom user
		if (memberId.split("-")[0] === "custom") return;

		// Check if user is in a voice channel
		const member = await guild.members.cache.get(memberId);
		if (!member?.voice?.channelId) return;

		// Move user
		try {
			member.voice.setChannel(
				channel,
				`${userMention(userId)} moved team members to a voice channel via DCWheel`
			);
		} catch (error) {
			console.error(error);
		}
	});
};

// POST /api/moveteamtovc
module.exports = async function postMoveTeamToVC(req, res) {
	// Confirm request has the required parameters
	if (!req.body?.guildId || !req.body?.channelId || !req.body?.data)
		return res.status(400).json({ error: "Missing parameters" });
	const accessToken = req.headers.authorization?.split(" ")[1];

	// Check if guild has enabled moving teams to VC
	// TODO: Add this when settings are implemented

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

	if (!userGuilds) return res.status(404).json({ error: "Error confirming guild" });
	if (!userGuilds.find((guild) => guild?.id === req.body?.guildId))
		return res.status(401).json({ error: "Unauthorized" });

	const guild = await client.guilds.cache.get(req.body?.guildId);

	// Confirm selected channel is approved by the moderators
	// TODO: Implement this, also show only channels that the bot has permission to

	// Move team to the channel
	const channel = await client.channels.cache.get(req.body?.channelId);
	if (!channel) return res.status(404).json({ error: "Channel not found" });
	moveTeam(guild, channel, req.body?.data, req.body?.userId);

	try {
		await client.channels.cache
			.get(process.env.NOTIFICATIONS_CHANNEL)
			.send(createEmbed(req.body?.userId, channel.id, req.body?.teamNumber));
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Failed to move team to a VC" });
	}

	return res.status(200).json({ success: true });
};
