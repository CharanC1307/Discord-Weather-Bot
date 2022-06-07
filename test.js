const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { Client, Intents, Collection, Interaction } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
})

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);

    (async () => {
        try {
            if (process.env.ENV === 'production') {
                await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
                console.log('Commands Deployed Globally');
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), { body: commands });
                console.log('Commands Deployed Locally');
            }
        } catch (err) {
            console.log('err');
            console.log(err);
        }
    })();
})

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    console.log(interaction.commandName);
    console.log(client.commands);
    console.log(command)
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