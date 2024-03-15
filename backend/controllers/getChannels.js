// GET /api/channels
module.exports = async function getChannels(req, res) {
	console.log(req.body);
	return res.status(200).json({ message: "getChannels" });
};
