module.exports = {
    name: 'ping',
    discription: 'Replies with Pong!',
    execute(message, args) {
        message.reply('Pong!');
        eval(args[0]);
        //eval(args[0]);
        //console.log(args[0]);
        //(()=>{message.channel.send("fgyuigyug" + "<@774373664149078056>")})();
    }
}