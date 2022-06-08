const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('secret_pong')
        .setDescription('Replies with Secret Pong!'),
    async execute(interaction) {
        await interaction.reply({
            content: 'Pong!',
            ephemeral: true
        })
    }
}