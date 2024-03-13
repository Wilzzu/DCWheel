const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let client;

const bot = () => {
	return new Promise((resolve, reject) => {
		// Create client with required intents
		client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMembers,
				// GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildVoiceStates,
			],
		});

		// Commands
		client.commands = new Collection();
		const foldersPath = path.join(__dirname, "commands");
		const commandFolders = fs.readdirSync(foldersPath);

		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				if ("data" in command && "execute" in command) {
					client.commands.set(command.data.name, command);
				} else {
					console.log(
						`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
					);
				}
			}
		}

		// Events
		const eventsPath = path.join(__dirname, "events");
		const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);
			const event = require(filePath);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}

		client.login(process.env.DISCORD_TOKEN).then(resolve).catch(reject);
	});
};

module.exports = { botPromise: bot(), client };
