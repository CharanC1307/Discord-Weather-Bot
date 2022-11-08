const { ClientUser } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const onlineStatus = `${client.user.username} is online!`;
        console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
        console.log("┃                                                                  ┃");
        console.log(`┃${onlineStatus.padStart((onlineStatus.length + 66) / 2, ' ').padEnd(66, ' ')}┃`);
        console.log("┃                                                                  ┃");
        console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");
        client.user.setPresence('In Template Building', { type: 'COMPETING' });
        client.user.setStatus('online');
    }
}