const { SlashCommandBuilder } = require('discord.js');

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDMPermission(true),
    async execute(interaction) {
        interaction.reply('Pong!')
    }
}