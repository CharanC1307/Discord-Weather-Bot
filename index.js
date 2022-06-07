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

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
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

client.on("messageCreate", msg => {
    //Check if the person replies yes to the question'
    console.log(msg.content);
    if (!msg.author.bot && msg.content.toLowerCase().includes('weather')) {
        msg.reply(`Did you ask for the weather <@${msg.author.id}>?`);
    }
})

client.login(process.env.BOT_TOKEN).then(() => {
    client.user.setPresence({ activities: [{ name: 'the weather', type: 'WATCHING' }], status: 'online' });
    console.log('Rich Presence Set')
});