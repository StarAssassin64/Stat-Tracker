const {token, cpf, OwnerID} = require('./config.json');
const { CommandoClient } = require('discord.js-commando');
const { path } = require('path');

const client = new CommandoClient({
    commandPrefix: cpf,
    owner: OwnerID,
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Default Group']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in......');
    client.user.setActivity('game');
});

client.login(token)
