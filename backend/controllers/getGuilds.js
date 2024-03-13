const { client } = require("../bot");

module.exports = async function getGuilds(req, res) {
	console.log(client.user.tag);
	if (!req.body.token) return res.status(401).json({ message: "Unauthorized" });
	return res.status(200).json({ message: "Hello from getGuilds" });
};
