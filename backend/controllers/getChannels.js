module.exports = async function getGuilds(req, res) {
	console.log(req.body);
	return res.status(200).json({ message: "Hello from getChannels" });
};
