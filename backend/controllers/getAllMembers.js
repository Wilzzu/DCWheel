const { client } = require("../bot");
const axios = require("axios");

// GET /api/members
module.exports = async function getGuilds(req, res) {
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

	if (!userGuilds) return res.status(404).json({ error: "Error fetching members" });
	if (!userGuilds.find((guild) => guild?.id === req.query?.guildId))
		return res.status(401).json({ error: "Unauthorized" });

	const guild = client.guilds.cache.get(req.query.guildId);
	try {
		await guild.members.fetch();
		// Remove bots from the list and format members
		const members = guild.members.cache
			?.filter((member) => !member.user.bot)
			.map((member) => ({
				id: member.id,
				name: member.nickname || member.user.globalName || member.user.username,
				searchName: [member.nickname, member.user.globalName, member.user.username].filter(
					// Remove nulls
					(e) => e
				),
				avatar: member.user.displayAvatarURL(),
			}));

		if (members) return res.status(200).json({ success: true, members: members });
		return res.status(200).json({ success: true, members: [] });
	} catch (error) {
		return res.status(500).json({ error: "An error occurred while fetching members" });
	}
};
