const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const getQuote = async (symbol) => {
    const config = {
        method: 'get',
        url: 'https://api.binance.us/api/v3/ticker/price',
        params: { 'symbol': symbol },
    };

    const res = await axios(config);
    return res.data;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crypto')
		.setDescription('Get latest crypto exchange quotes')
        .addStringOption(option =>
            option.setName('symbol')
                .setDescription('Crypto symbol')
                .setRequired(true)
                .addChoice('BTCUSD', 'BTCUSD')
                .addChoice('ETHUSD', 'ETHUSD')
                .addChoice('ETCUSD', 'ETCUSD')
                .addChoice('XRPUSD', 'XRPUSD')
                .addChoice('LTCUSD', 'LTCUSD')
                .addChoice('ADAUSD', 'ADAUSD')),
	async execute(interaction) {
        const symbol = interaction.options.getString('symbol');
        const quote = await getQuote(symbol);
        await interaction.reply(`${quote.symbol} current: ${quote.price}`);
    },
};

