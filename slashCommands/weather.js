const { SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

//Example of using database and replies
module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Replies with Pong!')
        .setDMPermission(true)
        .addStringOption(option =>
            option
                .setName('address')
                .setDescription('Your address. Your adress will not be stored anywhere.')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const {
            data: { data },
        } = await axios.get('http://api.positionstack.com/v1/forward', {
            params: { access_key: '22f47391fc643613e5f5a9c447dd656d', query: interaction.options.getString('address') },
        })

        if (data.length === 0) {
            interaction.reply('No results found.')
        } else {
            const [{ latitude, longitude, label }] = data
            const {
                data: {
                    current_weather: { temperature, windspeed },
                },
            } = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph`
            )
            interaction.reply({
                content: `The temperature is ${temperature} and the wind is blowing at ${windspeed} mph at ${label}.`,
                ephemeral: true,
            })
        }
    },
}
