require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const token = process.env.token;
const clientId = process.env.client_id;
const guildId = process.env.guild_id;

const rest = new REST({ version: '9' }).setToken(token);

const guildRegister = async (commands) => {
	try {
		console.log('Started GUILD application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
};

const globalRegister = async (commands) => {
	try {
		console.log('Started GLOBAL application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded GLOBAL (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
};

const loadCommands = () => {
	const commands = [];
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}
	return commands;
};

const main = () => {
	if (process.argv.length < 3) {
		console.error('Error: expected GLOBAL or GUILD command');
		return 1;
	}

	// If WIPE command exists and is intended
	let commands = [];
	if (process.argv[3]) {
		if (process.argv[3].toUpperCase() === 'WIPE') {
			console.log(`Running with WIPE command on ${process.argv[2]}`);
			commands = [];
		}
	}
	else {
		commands = loadCommands();
	}

	const cmd = process.argv[2].toUpperCase();
	if (cmd === 'GLOBAL') globalRegister(commands);
	else if (cmd === 'GUILD') guildRegister(commands);
	else console.error('Invalid command. Usage: parameter 1: global or guild. parameter 2: wipe (optional)');

};
main();