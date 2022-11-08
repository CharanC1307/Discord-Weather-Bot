const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const commands = [];
const commandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(path.join(commandsPath, file));
    process.env.ENV !== 'production' ? command.data.name = `${command.data.name}_dev` : null
    commands.push(command.data.toJSON());
})

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        if (process.env.ENV === 'production') {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })

            const testCommands = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID))
            testCommands.forEach(async command => {
                await rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, command.id))
            })
            
            console.log('Commands Deployed Globally');
        } else {
            await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
            console.log('Commands Deployed Locally');
        }
    } catch (err) {
        console.log(err);
    }
})();