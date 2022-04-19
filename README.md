# A Discord Bot using Node.JS

This bot is a work in progress.
It is implemented with the amazing discord.js library.

**npm install**

## Commands

Currently it has two commands:
/joke
/crypto

Each command is in its own file inside the **commands** folder

In order to test locally you would need to create your own Discord App and get a token via [Discord Developer Portal](https://ptb.discord.com/developers/docs)

### /crypto (symbol)

Required: symbol
Connects to [Binance](https://www.binance.us/en/home) API and returns the latest quote on popular Crypto currencies.

### /joke

Connects to [icanhazdadjoke](https://icanhazdadjoke.com/) API and returns a random dad joke.

## Roadmap

Some features I am planning to add:

<ul>
<li>Search Stack Overflow for programming questions</li>
<li>Stock quotes API (maybe Alpaca integration?)</li>
<li>Search Spotify for songs, play them in Discord</li>
<li>Load a meme using search terms</li>
</ul>

# License

MIT License
