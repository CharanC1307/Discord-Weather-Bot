module.exports = {
    name: 'ping',
    discription: 'Replies with Pong!',
    execute(message, args) {
        message.reply('Pong!');
    }
}