    const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .setDMPermission(true),
    async execute(interaction, client) {
        interaction.reply('Pong!')
    }
}

(async () => {
    //?access_key=22f47391fc643613e5f5a9c447dd656d&query=New%20York'
    const geoLocation = (await axios.get('http://api.positionstack.com/v1/forward', { params: { access_key: '22f47391fc643613e5f5a9c447dd656d', query: '450 south bennet avenue illinois' }})).data
    console.log(geoLocation)
    const weather = axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&temperature_unit=fahrenheit')
})()