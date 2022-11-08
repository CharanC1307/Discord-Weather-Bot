module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command =  client.slashCommands.get(interaction.commandName);
            if (!command) return;
        
            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);
                interaction.reply({
                    content: 'There was an error trying to execute that command!',
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {

        } else if (interaction.isSelectMenu()) {

        } else if (interaction.isAutocomplete()) {

        } else if (interaction.isModalSubmit()) {

        } else if (interaction.isModalClose()) {
            
        }
    }
};