const { client } = require("../bot");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const { AttachmentBuilder, userMention } = require("discord.js");

const createEmbed = (imageBuffer, userId) => {
	const imageName = `DCWheel_teams_${new Date().toLocaleString().replace(" ", "_")}.webp`;
	const image = new AttachmentBuilder(imageBuffer, { name: imageName });
	const user = userId ? userMention(userId) : "User";

	return { content: `## ${user} created new teams:`, files: [image] };
};

// POST /api/screenshot
module.exports = async function postScreenshotToGuild(req, res) {
	console.log("POST /api/screenshot", new Date().toLocaleString());

	// Confirm request has the required parameters
	if (!req.body?.guildId || !req.body?.channelId || !req.body?.data)
		return res.status(400).json({ error: "Missing parameters" });
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
			console.error(err.message, "Token:", accessToken);
			return null;
		});

	if (!userGuilds) return res.status(404).json({ error: "Error confirming guild" });
	if (!userGuilds.find((guild) => guild?.id === req.body?.guildId))
		return res.status(401).json({ error: "Unauthorized" });

	// Confirm selected channel is approved by the moderators
	// TODO: Implement this, also show only channels that the bot has permission to send messages to

	// Decrypt data and convert it to binary buffer
	const decryptedData = CryptoJS.AES.decrypt(req.body.data, process.env.ENCRYPTION_KEY).toString(
		CryptoJS.enc.Utf8
	);
	const imageBuffer = Buffer.from(decryptedData.split(",")[1], "base64");

	// Send screenshot to the channel
	const channel = client.channels.cache.get(req.body.channelId);
	if (!channel) return res.status(404).json({ error: "Channel not found" });

	try {
		await channel.send(createEmbed(imageBuffer, req.body?.userId));
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: "Failed to send screenshot" });
	}

	return res.status(200).json({ success: true });
};
