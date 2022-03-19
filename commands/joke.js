const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const getJoke = async () => {
    const url = 'https://icanhazdadjoke.com/';
    const config = {
        method: 'get',
        url: url,
        headers: { 'User-Agent': 'Axios - console app', 'Accept': 'application/json' },
    };

    const res = await axios(config);
    return res.data.joke;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Tells a dad joke'),
	async execute(interaction) {
        const joke = await getJoke();
        await interaction.reply(joke);
    },
};

