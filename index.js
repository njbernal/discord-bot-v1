require('dotenv').config();
const express = require('express');
const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const token = process.env.token;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.get('/', (req, res) => {
	console.log(`current: ${req.body}`);
	let counter = Number(req.params.current);
	counter++;
	res.send(`Heroku OK ${counter}`);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
    catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);