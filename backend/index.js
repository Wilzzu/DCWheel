const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getGuilds = require("./controllers/getGuilds");
const { botPromise } = require("./bot");
const getChannels = require("./controllers/getChannels");

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/guilds", getGuilds);
app.post("/api/channels", getChannels);

// Wait for the bot to be ready before starting the server
botPromise
	.then(() => {
		app.listen(port, () => console.log(`Server started on port ${port}`));
	})
	.catch((error) => {
		console.error("Error starting Discord bot:", error);
	});
