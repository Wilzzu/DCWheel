const CryptoJS = require("crypto-js");

// GET /api/encrypt
module.exports = async function getEncrypt(req, res) {
	if (!req.query?.provider_token || !req.query?.provider_refresh_token)
		return res.status(400).json({ error: "Missing parameters" });

	// Encrypt tokens
	const token = CryptoJS.AES.encrypt(req.query.provider_token, process.env.TOKEN_SECRET).toString();
	const refreshToken = CryptoJS.AES.encrypt(
		req.query.provider_refresh_token,
		process.env.TOKEN_SECRET
	).toString();

	return res.status(200).json({ provider_token: token, provider_refresh_token: refreshToken });
};
