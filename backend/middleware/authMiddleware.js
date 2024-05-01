const CryptoJS = require("crypto-js");
require("dotenv").config();

async function authMiddleware(req, res, next) {
	if (!req.headers.authorization) return res.status(403).json({ error: "No credentials" });
	const accessToken = req.headers.authorization?.split(" ")[1];
	if (!accessToken || accessToken === "undefined" || accessToken === "null") {
		return res.status(403).json({ error: "No credentials" });
	}
	// Decrypt token and set it as the new authorization header
	const decryptToken = CryptoJS.AES.decrypt(accessToken, process.env.TOKEN_SECRET).toString(
		CryptoJS.enc.Utf8
	);
	req.headers.authorization = `Bearer ${decryptToken}`;

	next();
}

module.exports = authMiddleware;
