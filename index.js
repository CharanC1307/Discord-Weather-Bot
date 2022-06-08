require('dotenv').config()
const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
    const command = require(path.join(slashCommandsPath, file));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.slashCommands.set(command.data.name, command);
}

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: 'There was an error trying to execute that command!',
            ephemeral: true
        });
    }
})

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

const prefix = '!';

client.on("messageCreate", message => {
    if (!(message.content.startsWith(prefix) || message.content.slice(0, client.user.id.length+3) === `<@${client.user.id}>`) || message.author.bot) return;
    //First take out the prefix. Then take out blank spaces at the end. Then turn into an array that is split between blanck spaces.
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    //Command is the first element in the array and the array loses the first index. Command also turn to lower case.
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (err) {
        console.error(err);
        message.reply('there was an error trying to execute that command!');
    }
    /*
    if (!command) return;
    console.log(msg.content);
    if (!msg.author.bot && msg.content.toLocaleLowerCase().includes('weather')) {
        msg.reply(`Did you ask for the weather <@${msg.author.id}>?`);
    }*/
})

client.login(process.env.BOT_TOKEN).then(() => {
    client.user.setPresence({ activities: [{ name: 'the weather', type: 'WATCHING' }], status: 'online' });
    console.log('Rich Presence Set')
});