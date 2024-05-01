const axios = require("axios");
const CryptoJS = require("crypto-js");
const qs = require("qs");

const generateNewTokens = async (encryptedRefreshToken, res) => {
	const refreshToken = CryptoJS.AES.decrypt(
		encryptedRefreshToken,
		process.env.TOKEN_SECRET
	).toString(CryptoJS.enc.Utf8);

	await axios
		.post(
			"https://discord.com/api/oauth2/token",
			qs.stringify({
				grant_type: "refresh_token",
				refresh_token: refreshToken,
				client_id: process.env.DISCORD_CLIENT_ID,
				client_secret: process.env.DISCORD_CLIENT_SECRET,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then((response) => {
			// Encrypt new tokens and respond with them
			const token = CryptoJS.AES.encrypt(
				response.data.access_token,
				process.env.TOKEN_SECRET
			).toString();
			const refreshToken = CryptoJS.AES.encrypt(
				response.data.refresh_token,
				process.env.TOKEN_SECRET
			).toString();
			res
				.status(200)
				.json({ newTokens: { provider_token: token, provider_refresh_token: refreshToken } });
		})
		.catch((err) => {
			console.log(err);
			return res.status(404).json({ error: "Error occurred while trying to create new tokens" });
		});
};

// GET /api/validate
module.exports = async function getValidate(req, res) {
	console.log("GET /api/validate", new Date().toLocaleString());
	if (!req.query?.provider_token || !req.query?.provider_refresh_token)
		return res.status(400).json({ error: "Missing parameters" });

	// Decrypt tokens
	const token = CryptoJS.AES.decrypt(req.query.provider_token, process.env.TOKEN_SECRET).toString(
		CryptoJS.enc.Utf8
	);

	// Validate token
	await axios
		.get("https://discord.com/api/users/@me", {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((response) => {
			return res.status(200).json({ success: true });
		})
		.catch((err) => {
			// If token is invalid, try generating new ones
			if (!req?.query?.provider_refresh_token) {
				return res.status(400).json({ error: "No refresh token provided" });
			}
			generateNewTokens(req.query.provider_refresh_token, res);
		});
};
