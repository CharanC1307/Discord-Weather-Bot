const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { Client, Collection, GatewayIntentBits } = require('discord.js')

//Client
//This is the client that will be used to interact with the Discord API.
//Intents is used to make sure the client can recieve different types of data form Discord API.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, //adds server functionality
        GatewayIntentBits.GuildMessages, //gets messages from our bot.
        GatewayIntentBits.MessageContent, //gets messages from our bot.
    ],
})

//Database
//No real database just caching the data.
client.database = {}

//Slash Commands
//Use client.slashCommands.get(commandName) to get the command.
client.slashCommands = new Collection()
const slashCommandsPath = path.join(__dirname, 'slashCommands')
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'))

slashCommandFiles.forEach(file => {
    const command = require(path.join(slashCommandsPath, file))
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.slashCommands.set(command.data.name, command)
})

//Events
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

eventFiles.forEach(file => {
    const event = require(path.join(eventsPath, file))
    if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
    else client.on(event.name, (...args) => event.execute(...args, client))
})

//Login
client.login(process.env.BOT_TOKEN)
