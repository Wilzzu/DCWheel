const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { botPromise } = require("./bot");
const getGuilds = require("./controllers/getGuilds");
const getChannels = require("./controllers/getChannels");

const port = process.env.PORT || 3001;
const app = express();

// Rate limiters
const guildLimit = rateLimit({
	windowMs: 1000 * 60 * 5,
	limit: 120, // Limit each IP to 120 requests per `window` (here, per 5 minutes).
	standardHeaders: "draft-7",
	legacyHeaders: false,
});
const channelLimit = rateLimit({
	windowMs: 1000 * 60 * 5,
	limit: 200,
	standardHeaders: "draft-7",
	legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	if (!req.headers.authorization) return res.status(403).json({ error: "No credentials" });
	next();
});

app.get("/api/guilds", guildLimit, getGuilds);
app.get("/api/channels", channelLimit, getChannels);

// Wait for the bot to be ready before starting the server
botPromise
	.then(() => {
		app.listen(port, () => console.log(`Server started on port ${port}`));
	})
	.catch((error) => {
		console.error("Error starting Discord bot:", error);
	});
