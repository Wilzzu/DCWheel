const axios = require("axios");

// GET /api/channels
module.exports = async function getChannels(req, res) {
	console.log("GET /api/channels");
	const accessToken = req.headers.authorization?.split(" ")[1];
	console.log(accessToken);
	console.log(req.query.guildId);
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
			return "error";
		});
	if (!userGuilds?.find((guild) => guild?.id === req.query?.guildId))
		return res.status(401).json({ error: "Unauthorized" });

	return res.status(200).json({ message: "getChannels" });
};
