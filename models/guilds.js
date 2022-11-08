const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String
    }
})

module.exports = {
    cmdName: 'guilds',
    model: mongoose.model('Guilds', Schema)
}