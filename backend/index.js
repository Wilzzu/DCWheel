const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { botPromise } = require("./bot");
const getGuilds = require("./controllers/getGuilds");
const getChannels = require("./controllers/getChannels");
const getAllMembers = require("./controllers/getAllMembers");
const postScreenshotToGuild = require("./controllers/postScreenshotToGuild");

const port = process.env.PORT || 3001;
const app = express();
app.set("trust proxy", 1); // For express-rate-limit

// Rate limiters
const limiter = (limit) => {
	return rateLimit({
		windowMs: 1000 * 60 * 5,
		limit, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
		standardHeaders: "draft-7",
		legacyHeaders: false,
	});
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	if (!req.headers.authorization) return res.status(403).json({ error: "No credentials" });
	const accessToken = req.headers.authorization?.split(" ")[1];
	if (!accessToken || accessToken === "undefined" || accessToken === "null") {
		return res.status(403).json({ error: "No credentials" });
	}
	next();
});

app.get("/api/guilds", limiter(100), getGuilds);
app.get("/api/channels", limiter(200), getChannels);
app.get("/api/members", limiter(200), getAllMembers);
app.post("/api/screenshot", limiter(20), postScreenshotToGuild);

// Wait for the bot to be ready before starting the server
botPromise
	.then(() => {
		app.listen(port, () => console.log(`Server started on port ${port}`));
	})
	.catch((error) => {
		console.error("Error starting Discord bot:", error);
	});
