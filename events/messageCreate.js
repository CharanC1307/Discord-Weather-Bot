module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.content.slice(0, client.user.id.length + 3) !== `<@${client.user.id}>`) return
        if (message.author.bot) return

        //First take out the prefix. Then take out blank spaces at the end. Then turn into an array that is split between blanck spaces.
        const args = message.content
            .slice(client.user.id.length + 3)
            .trim()
            .split(/ +/)
        //Command is the first element in the array and the array loses the first index. Command also turn to lower case.
        const commandName = args.shift().toLowerCase()

        const command = client.commands.get(commandName)
        if (!command) return

        try {
            command.execute(message, args, client)
        } catch (err) {
            console.error(err)
            message.reply('there was an error trying to execute that command!')
        }
    },
}
